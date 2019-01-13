import * as plugins from './cloudly.plugins';
import { Cloudly } from './cloudly.classes.cloudly';
import { request } from '@pushrocks/smartrequest';

/**
 * handles incoming requests from CI to deploy new versions of apps
 */
export class CloudlyServer {
  /**
   * a reference to the cloudly instance
   */
  private cloudlyRef: Cloudly;

  /**
   * the smartexpress server handling the actual requests
   */
  private smartexpressServer: plugins.smartexpress.Server;

  constructor(cloudlyArg: Cloudly) {
    this.cloudlyRef = cloudlyArg;
  }

  /**
   * authenticate a request
   */
  private async authenticateRequest(req: plugins.smartexpress.Request, res: plugins.smartexpress.Response): Promise<boolean> {
    // check ip to be one within the lossless organization
    const ip: string = req.ip;
    const result = this.cloudlyRef.digitalocean.checkValidIp(ip);
    return (result);
  }

  // =========
  // LIFECYCLE
  // =========

  /**
   * init the reception instance
   */
  public async init() {
    const sslCert = await this.cloudlyRef.letsencrypt.getCertificateForDomain(
      this.cloudlyRef.config.publicUrl
    );

    // server
    this.smartexpressServer = new plugins.smartexpress.Server({
      cors: true,
      forceSsl: false,
      defaultAnswer: async () => {
        const response = await plugins.smartrequest.request(this.cloudlyRef.config.splashPageUrl, {
          method: 'GET'
        });
        return response.body;
      },
      port: this.cloudlyRef.config.publicPort,
      privateKey: sslCert.privateKey,
      publicKey: sslCert.publicKey
    });

    // approute
    this.smartexpressServer.addRoute(
      '/app',
      new plugins.smartexpress.Handler('POST', async (req, res) => {
        if(await this.authenticateRequest(req, res)) {
          const requestData = req.body;
          this.cloudlyRef.szClusterRef.szManager.addApp(requestData);
        } else {
          res.status(500);
          res.send(`Not allowed to perform this operation!`);
        }
      })
    );

    // certroute
    this.smartexpressServer.addRoute(
      '/cert',
      new plugins.smartexpress.Handler('POST', async (req, res) => {
        if(await this.authenticateRequest(req, res)) {
          const requestBody = req.body;
          const cert = await this.cloudlyRef.letsencrypt.getCertificateForDomain(requestBody.domainName);
          res.status(200);
          res.send(await cert.createSavableObject());
          res.end();
        } else {
          res.status(500);
          res.send(`Not allowed to perform this operation!`);
          res.end();
        }
      })
    );

    await this.smartexpressServer.start();
  }

  /**
   * stop the reception instance
   */
  public async stop() {
    await this.smartexpressServer.stop();
  }
}

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
  private async authenticateRequest (req, res) {

  };

  // =========
  // LIFECYCLE
  // =========

  /**
   * init the reception instance
   */
  public async init() {
    const sslCert = await this.cloudlyRef.letsencrypt.getCertificateForDomain(this.cloudlyRef.config.publicUrl);

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
      port: 5000,
      privateKey: sslCert.privateKey,
      publicKey: sslCert.publicKey
  
    });

    const appHandler = new plugins.smartexpress.Handler('POST', requestArg => {
      const requestData = requestArg.body;
      this.cloudlyRef.szClusterRef.szManager.addApp(requestData);
    });

    this.smartexpressServer.addRoute('/app', appHandler);
    await this.smartexpressServer.start(process.env.PORT || 5000);
  }

  /**
   * stop the reception instance
   */
  public async stop() {
    await this.smartexpressServer.stop();
  }
}

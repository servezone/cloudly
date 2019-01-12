import * as plugins from './cloudly.plugins';
import { CloudlyConfig, ICloudlyConfig } from './cloudly.classes.config';

// servezone imports
import { SzApp, SzCluster, SzService, SzSubService } from '@servezone/servezone';

// interfaces
import {} from '@tsclass/tsclass';
import { CloudlyServer } from './cloudly.classes.server';
import { CloudlyTaskmanager } from './cloudly.classes.taskmanager';
import { CloudlyUniversemanager } from './cloudly.classes.universemanager';

// services
import { CloudlyCloudflare } from './cloudly.classes.ext.cloudflare';
import { CloudlyDigitalOcean } from './cloudly.classes.ext.digitalocean';
import { CloudlyGitlab } from './cloudly.classes.ext.gitlab';
import { CloudlyLetsEncrypt } from './cloudly.classes.ext.letsencrypt';

/**
 * Cloudly class can be used to instantiate a cloudly server.
 * It is implemented as class in order to make it easier ro write node services that are more adjusted to invidual services
 * 
 * ```ts
 * const mycloudly = new Cloudly ({...})
 * ```
 */
export class Cloudly {
  public config: CloudlyConfig;
  public logger: plugins.smartlog.Smartlog;
  public server: CloudlyServer;
  public taskmanager: CloudlyTaskmanager;
  public universemanager: CloudlyUniversemanager;
  public szClusterRef: plugins.servezone.SzCluster;
  public ready: Promise<any>;

  // services
  public cloudflare: CloudlyCloudflare;
  public digitalocean: CloudlyDigitalOcean;
  public gitlab: CloudlyGitlab;
  public letsencrypt: CloudlyLetsEncrypt;

  private readyDeferred = new plugins.smartq.Deferred();

  constructor(cloudlyConfigArg: ICloudlyConfig) {
    this.config = new CloudlyConfig(cloudlyConfigArg);
    this.logger = this.config.logger || plugins.smartlog.defaultLogger;
    this.server = new CloudlyServer(this);
    this.ready = this.readyDeferred.promise;

    // services
    this.cloudflare = new CloudlyCloudflare(this);
    this.letsencrypt = new CloudlyLetsEncrypt(this);
    this.gitlab = new CloudlyGitlab(this);
  }

  /**
   * starts the cloudly instance and
   * @param configArg
   */
  public async start() {
    await this.cloudflare.init();
    await this.letsencrypt.init();
    await this.initServeZone();
    await this.server.init();
    this.readyDeferred.resolve();
  }

  /**
   * stop the reception instance
   */
  public async stop() {
    await this.server.stop();
  }

  /**
   * 
   */
  private async initServeZone() {
    this.szClusterRef = new plugins.servezone.SzCluster();
    await this.szClusterRef.init({});
  }
}

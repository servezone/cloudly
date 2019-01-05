import * as plugins from './cloudly.plugins';
import { CloudlyConfig, ICloudlyConfig } from './cloudly.classes.config';

// servezone imports
import { SzApp, SzCluster, SzService, SzSubService } from '@servezone/servezone';

// interfaces
import {} from '@tsclass/tsclass';
import { CloudlyReception } from './cloudly.classes.reception';
import { CloudlyTaskmanager } from './cloudly.classes.taskmanager';
import { CloudlyUniversemanager } from './cloudly.classes.universemanager';

// services
import { CloudlyCloudflare } from './cloudly.classes.ext.cloudflare';
import { CloudlyDigitalOcean } from './cloudly.classes.ext.digitalocean';
import { CloudlyGitlab } from './cloudly.classes.ext.gitlab';
import { CloudlyLetsEncrypt } from './cloudly.classes.ext.letsencrypt';

export class Cloudly {
  public config: CloudlyConfig;
  public logger: plugins.smartlog.Smartlog;
  public reception: CloudlyReception;
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
    this.reception = new CloudlyReception(this);
    this.ready = this.readyDeferred.promise;
  }

  /**
   * starts the cloudly instance and
   * @param configArg
   */
  public async start() {
    await this.initServeZone();
    await this.reception.init();
    this.readyDeferred.resolve();
  }

  /**
   * stop the reception instance
   */
  public async stop() {
    await this.reception.stop();
  }

  /**
   * 
   */
  private async initServeZone() {
    this.szClusterRef = new plugins.servezone.SzCluster();
    await this.szClusterRef.init({});
  }
}

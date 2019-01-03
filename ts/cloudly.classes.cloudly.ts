import * as plugins from './cloudly.plugins';
import { CloudlyConfig, ICloudlyConfig } from './cloudly.classes.config';

// servezone imports
import { SzApp, SzCluster, SzService, SzSubService } from '@servezone/servezone';

// interfaces
import {} from '@tsclass/tsclass';
import { CloudlyReception } from './cloudly.classes.reception';

export class Cloudly {
  config: CloudlyConfig;
  reception: CloudlyReception;
  szClusterRef: plugins.servezone.SzCluster;
  ready: Promise<any>;
  private readyDeferred = new plugins.smartq.Deferred();

  constructor(cloudlyConfigArg: ICloudlyConfig) {
    this.config = new CloudlyConfig(cloudlyConfigArg)
    this.reception = new CloudlyReception(this);
    this.ready = this.readyDeferred.promise;
  }

  /**
   * starts the cloudly instance and 
   * @param configArg
   */
  async start() {
    await this.initServeZone();
    await this.reception.init();
    this.readyDeferred.resolve();
  }

  /**
   * stop the reception instance
   */
  async stop() {
    await this.reception.stop();
  }

  private async initServeZone() {
    this.szClusterRef = new plugins.servezone.SzCluster();
    await this.szClusterRef.init({});
  }
}

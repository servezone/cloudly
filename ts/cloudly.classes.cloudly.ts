import * as plugins from './cloudly.plugins';
import { CloudlyConfig } from './cloudly.classes.config';

// servezone imports
import { SzApp, SzCluster, SzService, SzSubService } from '@servezone/servezone';

// interfaces
import {} from '@tsclass/tsclass';
import { cloudlyCli } from './cloudly.cli';
import { CloudlyReception } from './cloudly.classes.reception';

export class Cloudly {
  config: CloudlyConfig;
  reception = new CloudlyReception(this);
  szClusterRef: plugins.servezone.SzCluster;
  ready: Promise<any>;
  private readyDeferred = new plugins.smartq.Deferred();

  constructor() {
    this.ready = this.readyDeferred.promise;
  }

  /**
   *
   * @param configArg
   */
  async start(configArg: CloudlyConfig) {
    this.config = configArg;
    await this.initServeZone();
    this.readyDeferred.resolve();
    await this.reception.init();
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

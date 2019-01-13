import * as plugins from './cloudly.plugins';

export class CloudlyMongodb {
  /**
   * this is the mongodbInstance for cloudly
   */
  smartDb = new plugins.smartdata.SmartdataDb({
    mongoDbName: '',
    mongoDbPass: '',
    mongoDbUrl: ''
  });
}

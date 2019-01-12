import * as plugins from './cloudly.plugins';

/**
 * this is the mongodbInstance for cloudly
 */
export const smartDb = new plugins.smartdata.SmartdataDb({
  mongoDbName: '',
  mongoDbPass: '',
  mongoDbUrl: ''
});
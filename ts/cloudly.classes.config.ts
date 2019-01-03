import * as plugins from './cloudly.plugins';

export interface ICloudlyConfig {
  splashPageUrl?: string;
  cfEmail?: string;
  cfToken?: string;
  mongodbConnectionUrl?: string;
  gitlabUser?: string;
  gitlabToken?: string;
}

/**
 * the main cloudly config
 */
export class CloudlyConfig {
  config: ICloudlyConfig = {};
  constructor(configArg: ICloudlyConfig) {
     
  }
}

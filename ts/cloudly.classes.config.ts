import * as plugins from './cloudly.plugins';

export interface ICloudlyConfig {
  logger?: plugins.smartlog.Smartlog;
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
export class CloudlyConfig implements ICloudlyConfig {
  public logger: plugins.smartlog.Smartlog;
  public splashPageUrl: string;
  public cfEmail: string;
  public cfToken: string;
  public mongodbConnectionUrl: string;
  public gitlabUser: string;
  public gitlabToken: string;
  constructor(configArg: ICloudlyConfig) {
    Reflect.ownKeys(configArg).forEach(keyArg => {
      this[keyArg] = configArg[keyArg];
    });
  }
}

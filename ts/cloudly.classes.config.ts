import * as plugins from './cloudly.plugins';

export interface ICloudlyConfig {
  cfEmail?: string;
  cfToken?: string;
  gitlabUser?: string;
  gitlabToken?: string;
  letsEncryptEmail?: string;
  letsEncryptPrivateKey?: string;
  logger?: plugins.smartlog.Smartlog;
  mongodbConnectionUrl?: string;
  publicUrl: string;
  splashPageUrl?: string;
}

/**
 * the main cloudly config
 */
export class CloudlyConfig implements ICloudlyConfig {
  public cfEmail: string;
  public cfToken: string;
  public gitlabUser: string;
  public gitlabToken: string;
  public letsEncryptEmail: string;
  public letsEncryptPrivateKey: string;
  public logger: plugins.smartlog.Smartlog;
  public mongodbConnectionUrl: string;
  public publicUrl: string;
  public splashPageUrl: string;
  constructor(configArg: ICloudlyConfig) {
    Object.keys(configArg).forEach(keyArg => {
      this[keyArg] = configArg[keyArg];
    });
  }
}

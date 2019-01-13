import * as plugins from './cloudly.plugins';

export interface ICloudlyConfig {
  cfEmail: string;
  cfToken: string;
  digitalOceanToken: string;
  gitlabUser?: string;
  gitlabToken?: string;
  letsEncryptEmail: string;
  letsEncryptPrivateKey?: string;
  logger?: plugins.smartlog.Smartlog;
  mongoDescriptor: plugins.smartdata.IMongoDescriptor;
  publicUrl: string;
  publicPort: string;
  splashPageUrl?: string;
}

/**
 * the main cloudly config
 */
export class CloudlyConfig implements ICloudlyConfig {
  public cfEmail: string;
  public cfToken: string;
  public digitalOceanToken: string;
  public gitlabUser: string;
  public gitlabToken: string;
  public letsEncryptEmail: string;
  public letsEncryptPrivateKey: string;
  public logger: plugins.smartlog.Smartlog;
  public mongoDescriptor: plugins.smartdata.IMongoDescriptor;
  public publicUrl: string;
  public publicPort: string;
  public splashPageUrl: string;
  constructor(configArg: ICloudlyConfig) {
    Object.keys(configArg).forEach(keyArg => {
      this[keyArg] = configArg[keyArg];
    });
  }
}

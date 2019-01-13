import * as plugins from './cloudly.plugins';
import { Cloudly } from './cloudly.classes.cloudly';

/**
 * the portion of Cloudflare responsible
 */
export class CloudlyCloudflare {
  private cloudlyRef: Cloudly;
  public cloudflare: plugins.cloudflare.CloudflareAccount;

  constructor(cloudlyArg: Cloudly) {
    this.cloudlyRef = cloudlyArg;
    this.cloudflare = new plugins.cloudflare.CloudflareAccount();
  }

  // init the instance
  async init() {
    this.cloudflare.auth({
      email: this.cloudlyRef.config.cfEmail,
      key: this.cloudlyRef.config.cfToken
    });
  }
}

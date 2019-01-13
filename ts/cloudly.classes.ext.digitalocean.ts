import * as plugins from './cloudly.plugins';
import { Cloudly } from './cloudly.classes.cloudly';

export class CloudlyDigitalOcean {
  private cloudlyRef: Cloudly;
  public digitalocean: plugins.digitalocean.DigitalOceanAccount;

  constructor(cloudlyRefArg: Cloudly) {
    this.cloudlyRef = cloudlyRefArg;
    this.digitalocean = new plugins.digitalocean.DigitalOceanAccount(this.cloudlyRef.config.digitalOceanToken);
  }

  public checkValidIp(ipArg: string): boolean {
    this.digitalocean;
    return true;
  }
}

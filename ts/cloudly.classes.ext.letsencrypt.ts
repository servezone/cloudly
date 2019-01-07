import * as plugins from './cloudly.plugins';
import { Cloudly } from './cloudly.classes.cloudly';

export class CloudlyLetsEncrypt {
  cloudlyRef: Cloudly;

  constructor(cloudlyArg: Cloudly) {
    this.cloudlyRef = cloudlyArg;
  }

  private smartacme = new plugins.smartacme.SmartAcme();

  public async getCertificateForDomain (domainName: string) {
    await this.smartacme.getCertificateForDomain(domainName);
  };

  /**
   * inits letsencrypt
   */
  public async init () {
    await this.smartacme.init({
      accountEmail: this.cloudlyRef.config.letsEncryptEmail,
      accountPrivateKey: this.cloudlyRef.config.letsEncryptPrivateKey,
      setChallenge: async (dnsDomainName: string, keyAuthorization: string) => {
        await this.cloudlyRef.cloudflare.cloudflare.createRecord(dnsDomainName, 'TXT', keyAuthorization);
        console.log('Cool down for 20 seconds');
        await plugins.smartdelay.delayFor(20000);
        console.log(`successfully set domain name`);
      },
      removeChallenge: async (dnsDomainName: string) => {
        await this.cloudlyRef.cloudflare.cloudflare.removeRecord(dnsDomainName, 'TXT');
        console.log('successfully removed dnsDomainName');
      }
    });
    await this.getCertificateForDomain(this.cloudlyRef.config.publicUrl);
  }
}
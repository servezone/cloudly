import * as plugins from './cloudly.plugins';

export class CloudlyLetsEncrypt {
  public smartacme = new plugins.smartacme.SmartAcme();

  async getCertificateForDomain () {};
}
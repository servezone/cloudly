import * as plugins from './cloudly.plugins';

export interface ICloudlyConfig {}

export class CloudlyConfig {
  config: ICloudlyConfig = {};
  init(argvArg: any) {
    this.readFromFile();
    this.readFromEnv();
    this.readFromCli(argvArg);
  }

  /**
   * tries to read config from cli input
   */
  private readFromCli(argvArg) {}

  /**
   * tries to read config from environment
   */
  private readFromEnv() {}

  /**
   * tries to read config from file
   */
  private readFromFile() {}
}

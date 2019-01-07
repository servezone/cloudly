import * as plugins from './cloudly.plugins';
import { Cloudly } from './cloudly.classes.cloudly';

export class CloudlyGitlab {
  private cloudlyRef: Cloudly;

  constructor(cloudlyArg: Cloudly) {
    this.cloudlyRef = cloudlyArg;
  }
}

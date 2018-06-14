import * as plugins from './cloudly.plugins';
import { Cloudly } from './cloudly.classes.cloudly';
import { Server } from 'smartexpress';
import { request } from 'smartrequest/dist/smartrequest.request';

export class CloudlyReception {
  cloudlyRef: Cloudly;
  smartexpressServer = new plugins.smartexpress.Server({
    cors: true,
    forceSsl: true,
    defaultAnswer: `cloudly version `
  });

  constructor(cloudlyArg: Cloudly) {
    this.cloudlyRef = cloudlyArg;
    const appHandler = new plugins.smartexpress.Handler('POST', requestArg => {
      let requestData = requestArg.body;
      this.cloudlyRef.szClusterRef.szManager.addApp(requestData);
    });
    this.smartexpressServer.addRoute('/app', appHandler);
  }

  async init() {
    await this.smartexpressServer.start(process.env.PORT || 5000);
  }

  async stop() {
    await this.smartexpressServer.stop();
  }
}

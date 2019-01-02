import * as plugins from './cloudly.plugins';
import { Cloudly } from './cloudly.classes.cloudly';
import { Server } from '@pushrocks/smartexpress';
import { request } from '@pushrocks/smartrequest';

/**
 * handles incoming requests from CI to deploy new versions of apps
 */
export class CloudlyReception {
  /**
   * a reference to the cloudly instance
   */
  cloudlyRef: Cloudly;

  /**
   * the smartexpress server handling the actual requests
   */
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

  /**
   * authenticate a request
   */
  authenticateRequest;

  /**
   * init the reception instance
   */
  async init() {
    await this.smartexpressServer.start(process.env.PORT || 5000);
  }

  /**
   * stop the reception instance
   */
  async stop() {
    await this.smartexpressServer.stop();
  }
}

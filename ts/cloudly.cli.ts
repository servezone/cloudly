import * as plugins from './cloudly.plugins';
import { Cloudly } from './cloudly.classes.cloudly';
import { CloudlyConfig } from './cloudly.classes.config';
import { cloudlySlack } from './cloudly.monitor';

import { Smartcli } from 'smartcli';

export let cloudlyCli = new plugins.smartcli.Smartcli();
export let mainCloudlyInstance = new Cloudly();
cloudlyCli
  .standardTask()
  .then(async argvArg => {
    if (process.env.TESTING_CLOUDLY) {
      return;
    }
    cloudlySlack.sendMessage(
      {
        title: `Starting Cloudly Instance:`,
        text: `Cloudly started!`,
        author_name: 'Cloudly on Heroku'
      },
      'cloudly'
    );
    plugins.beautylog.figletSync('Cloudly');
    let cloudlyConfig = new CloudlyConfig();
    cloudlyConfig.init(argvArg);
    await mainCloudlyInstance.start(cloudlyConfig);
  })
  .catch(err => {
    console.log(err);
  });

cloudlyCli.addVersion('any version');
cloudlyCli.startParse();

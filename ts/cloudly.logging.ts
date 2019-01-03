import * as plugins from './cloudly.plugins';

// Slack
import { Slackme, SlackMessage } from '@mojoio/slack';
import { smartlog } from '@pushrocks/smartcli/dist/smartcli.plugins';
export const cloudlySlack = new plugins.slackme.Slackme(process.env.SLACK_TOKEN);

export const logger = new smartlog.Smartlog({
  logContext: {
    company: 'Some Company',
    companyunit: 'Some Company Unit',
    containerName: 'SomeContainer',
    environment: 'local',
    runtime: 'node',
    zone: 'some zone'
  }
})
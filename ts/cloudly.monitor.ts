import * as plugins from './cloudly.plugins';

// Slack
import { Slackme, SlackMessage } from '@mojoio/slack';
export const cloudlySlack = new plugins.slackme.Slackme(process.env.SLACK_TOKEN);

// Elasticlog
const elasticlogInstance = new plugins.elasticlog.ElasticLog({
  domain: '',
  port: 500,
  ssl: true,
  user: '',
  pass: '',
  logContext: {}
});

elasticlogInstance;

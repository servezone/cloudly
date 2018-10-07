import * as plugins from './cloudly.plugins';
import { Slackme, SlackMessage } from '@mojoio/slack';
export const cloudlySlack = new plugins.slackme.Slackme(process.env.SLACK_TOKEN);

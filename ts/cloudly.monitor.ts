import * as plugins from './cloudly.plugins';
import { Slackme, SlackMessage } from 'slackme';
export const cloudlySlack = new plugins.slackme.Slackme(process.env.SLACK_TOKEN);

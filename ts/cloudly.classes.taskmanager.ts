import * as plugins from './cloudly.plugins';

export class CloudlyTaskmanager {
  public everyMinuteTask = new plugins.taskbuffer.Task({
    taskFunction: async () => {}
  });

  public everyHourTask = new plugins.taskbuffer.Task({
    taskFunction: async () => {}
  });
}

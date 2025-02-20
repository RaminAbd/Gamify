import { TaskAssigneeModel } from './task-assignee.model';

export class TasksResponseModel {
  id: string;
  name: any;
  description: any;
  startTime: string;
  deadline: string;
  assignee: TaskAssigneeModel = new TaskAssigneeModel();
  type: number;
  status: number;
}

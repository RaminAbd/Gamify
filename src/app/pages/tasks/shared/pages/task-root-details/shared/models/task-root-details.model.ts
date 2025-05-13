import {AssigneeModel} from './assignee.model';

export class TaskRootDetailsModel {
  id: string
  name: any
  description: any
  startTime: string
  deadline: string
  assignee: AssigneeModel= new AssigneeModel()
  type: number
  status: number
  time:any;
  expectedPoints:number;
}

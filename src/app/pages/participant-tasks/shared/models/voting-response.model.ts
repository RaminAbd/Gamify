import { AssigneeModel } from '../../../tasks/shared/pages/task-root-details/shared/models/assignee.model';

export class VotingResponseModel {
  taskId: string;
  votedTo?: any;
  rootId: string;
  candidates: AssigneeModel[] = [];
  name: string;
  description: string;
}

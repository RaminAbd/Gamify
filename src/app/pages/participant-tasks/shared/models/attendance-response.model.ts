import {
  TasksResponseModel
} from '../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/models/tasks-response.model';

export class AttendanceResponseModel {
  qrCode:string;
  task:TasksResponseModel = new TasksResponseModel();
}

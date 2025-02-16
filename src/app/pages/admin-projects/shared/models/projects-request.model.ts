import { FileModel } from '../../../../core/models/File.model';

export class ProjectsRequestModel {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  rewardRules: string;
  startDate: any;
  endDate: any;
  image: FileModel = new FileModel();
  organization: string;
}

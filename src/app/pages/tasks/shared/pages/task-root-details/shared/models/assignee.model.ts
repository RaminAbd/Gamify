import { FileModel } from '../../../../../../../core/models/File.model';

export class AssigneeModel {
  id: string;
  firstName: string;
  lastName: string;
  groupId: string;
  image: FileModel = new FileModel();
  email: string;
}

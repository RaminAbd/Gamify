import { FileModel } from '../../../../core/models/File.model';

export class ParticipantSignupRequestModel {
  groupParticipantId: string;
  firstName: string;
  lastName: string;
  email: string;
  image: FileModel = new FileModel();
  password: string;
  repeatPassword: string;
  nickName: string;
}

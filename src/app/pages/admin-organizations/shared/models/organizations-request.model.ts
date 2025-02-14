import { FileModel } from '../../../../core/models/File.model';

export class OrganizationsRequestModel {
  email: string;
  firstName: string;
  lastName: string;
  organizationId: string;
  name: string;
  country: string;
  website: string;
  socialMediaLink: string;
  logo: FileModel = new FileModel();
  password: string;
  repeatPassword: string;
  otpCode: number;
}

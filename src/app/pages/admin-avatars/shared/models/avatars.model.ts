import { FileModel } from '../../../../core/models/File.model';

export class AvatarsModel {
  id?: string;
  image: FileModel = new FileModel();
  imageUrl: string;
}

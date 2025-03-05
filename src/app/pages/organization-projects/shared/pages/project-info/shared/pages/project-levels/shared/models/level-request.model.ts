import {FileModel} from '../../../../../../../../../../core/models/File.model';

export class LevelRequestModel {
  id: string
  projectId: string
  name: string
  image: FileModel = new FileModel()
  fromPoints: number
  toPoints: number
  type: number
}

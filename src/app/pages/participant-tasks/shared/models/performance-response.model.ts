import {FileModel} from '../../../../core/models/File.model';

export class PerformanceResponseModel {
  id: string
  name: string
  description: any
  status: number
  files: FileModel[]=[]
}

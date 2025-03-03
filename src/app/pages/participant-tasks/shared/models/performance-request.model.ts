import {FileModel} from '../../../../core/models/File.model';

export class PerformanceRequestModel {
  id: string;
  file:FileModel = new FileModel();
}

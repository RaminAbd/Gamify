import {inject, Injectable} from '@angular/core';
import {PPerformanceComponent} from './p-performance.component';
import {PerformancesApiService} from '../../services/performances.api.service';
import {BlobService} from '../../../../../core/services/blob.service';
import {PerformanceRequestModel} from '../../models/performance-request.model';

@Injectable({
  providedIn: 'root'
})
export class PPerformanceService {
  component: PPerformanceComponent;
  private service:PerformancesApiService = inject(PerformancesApiService)
  private blob:BlobService = inject(BlobService)
  constructor() { }

  getTask() {
    this.service.GetById(this.service.serviceUrl, this.component.id).subscribe(resp=>{
      this.component.task = resp.data;
      this.component.request.id = this.component.task.id;
    })
  }

  getFile(e: any, fileHandler: any) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.blob.UploadFile(fd).subscribe((resp: any) => {
        fileHandler(resp);
      });
    }
  }

  addFile() {
    this.service.AddFile(this.component.request).subscribe(resp=>{
      if(resp.succeeded){
        this.getTask();
        this.component.request = new PerformanceRequestModel()
        this.component.request.id = this.component.task.id;
      }
    })
  }

  removeFile(id:string) {
    const req = {
      id: this.component.task.id,
      fileId:id,
    }
    this.service.RemoveFile(req).subscribe(resp=>{
      this.getTask();
    })
  }
}

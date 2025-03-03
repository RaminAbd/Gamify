import {Component, inject} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {PPerformanceService} from './p-performance.service';
import {PerformanceResponseModel} from '../../models/performance-response.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PerformanceRequestModel} from '../../models/performance-request.model';

@Component({
  selector: 'app-p-performance',
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './p-performance.component.html',
  styleUrl: './p-performance.component.scss'
})
export class PPerformanceComponent {
  private service:PPerformanceService = inject(PPerformanceService);
  private route:ActivatedRoute = inject(ActivatedRoute);
  private router:Router = inject(Router);
  id =  this.route.snapshot.paramMap.get('id') as string;
  task:PerformanceResponseModel = new PerformanceResponseModel();
  request:PerformanceRequestModel = new PerformanceRequestModel();
  constructor() {
    this.service.component = this;

    this.service.getTask()
  }

  getFile(e: any) {
    this.request.file.fileLoading = true;
    this.service.getFile(e, (resp: any) => {
      this.request.file.fileLoading = false;
      this.request.file = resp.data;
      this.request.file.fakeFile = null;
      this.request.file.isValid = true;
      this.service.addFile()
    });
  }

  getFileName(fileName: string): string {
    if (fileName) {
      if (fileName.length > 30) {
        return this.changeFileName(fileName);
      } else {
        return fileName;
      }
    } else {
      return '';
    }
  }

  changeFileName(name: string) {
    return (
      name.substring(0, 10) +
      '...' +
      name.substring(name.length - 5, name.length)
    );
  }

  removeFile(id: string) {
    this.service.removeFile(id)
  }

  finishTask(){
    this.router.navigate(['main/participant/home'])
  }
}

import {Component, inject} from '@angular/core';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {BarcodeFormat} from '@zxing/library';
import {AttendanceService} from './attendance.service';
import {AssigneeModel} from '../task-root-details/shared/models/assignee.model';
import {Location, NgIf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-attendance',
  imports: [
    ZXingScannerModule,
    NgIf
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent {
  allowedFormats: BarcodeFormat[] = [BarcodeFormat.QR_CODE]; // Use BarcodeFormat Enum
  private service:AttendanceService =  inject(AttendanceService);
  public location:Location = inject(Location);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  id = this.route.snapshot.paramMap.get('id') as string;
  assignee:AssigneeModel = new AssigneeModel();
  taskId:string;
  isShown:boolean = false;
  showInfo:boolean = false;
  showWarning:boolean = false;
  constructor() {
    this.service.component = this;
  }
  onScanSuccess(result: string) {
    if(!this.isShown){
      let res:any = JSON.parse(result);
      if(this.id === res.taskId){
        this.assignee = res.assignee;
        this.taskId = res.taskId;
        this.showInfo = true;
        console.log(res)
      }
      else{
        this.showWarning = true;
      }
      this.isShown = true;
    }
  }

  complete(){
    this.service.complete()
  }
}

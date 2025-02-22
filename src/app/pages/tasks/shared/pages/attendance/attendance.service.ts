import {inject, Injectable} from '@angular/core';
import {AttendanceComponent} from './attendance.component';
import {AttendancesApiService} from './shared/services/attendances.api.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  component: AttendanceComponent;
  private service:AttendancesApiService = inject(AttendancesApiService);
  constructor() { }

  complete() {
    let req ={
      taskId:this.component.taskId,
    }
    this.service.Scan(req).subscribe(resp=>{
      this.component.location.back()
    })
  }
}

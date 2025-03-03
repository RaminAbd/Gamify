import {inject, Injectable} from '@angular/core';
import {PAttendanceComponent} from './p-attendance.component';
import {AttendancesApiService} from '../../../../tasks/shared/pages/attendance/shared/services/attendances.api.service';

@Injectable({
  providedIn: 'root'
})
export class PAttendanceService {
  component: PAttendanceComponent;
  private service:AttendancesApiService = inject(AttendancesApiService)
  constructor() { }

  getAttendances() {
    this.service.GetById(this.service.serviceUrl, this.component.id).subscribe(resp=>{
      this.component.attendance = resp.data;
    })
  }

}

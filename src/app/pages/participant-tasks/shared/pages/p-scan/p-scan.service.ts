import { inject, Injectable } from '@angular/core';
import { AttendancesApiService } from '../../../../tasks/shared/pages/attendance/shared/services/attendances.api.service';
import { PScanComponent } from './p-scan.component';

@Injectable({
  providedIn: 'root',
})
export class PScanService {
  component: PScanComponent;
  private service: AttendancesApiService = inject(AttendancesApiService);
  constructor() {}

  getAttendances() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .subscribe((resp) => {
        this.component.attendance = resp.data;
      });
  }

  scan(req: any) {
    this.service.ScanAsParticipant(req).subscribe((resp) => {
      this.component.finish();
    });
  }
}

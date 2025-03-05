import {inject, Injectable} from '@angular/core';
import {AttendanceComponent} from './attendance.component';
import {AttendancesApiService} from './shared/services/attendances.api.service';
import {LevelsApiService} from '../../../../participant-home/shared/services/levels.api.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  component: AttendanceComponent;
  private service:AttendancesApiService = inject(AttendancesApiService);
  private levelsService: LevelsApiService = inject(LevelsApiService);
  constructor() { }

  complete() {
    let req ={
      taskId:this.component.taskId,
    }
    this.service.Scan(req).subscribe(resp=>{
      this.component.location.back()
    })
  }

  getParticipantLevel() {
    const req = {
      participantId: this.component.assignee.id,
      projectId: this.component.projectId,
    }
    this.levelsService.GetParticipantLevel(req).subscribe((resp) => {
      this.component.levelInfo = resp.data
      this.component.showInfo = true
    })
  }
}

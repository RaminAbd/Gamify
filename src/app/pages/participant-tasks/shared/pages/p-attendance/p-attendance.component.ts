import {Component, inject} from '@angular/core';
import {AttendanceResponseModel} from '../../models/attendance-response.model';
import {PAttendanceService} from './p-attendance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-p-attendance',
  imports: [
    NgIf
  ],
  templateUrl: './p-attendance.component.html',
  styleUrl: './p-attendance.component.scss'
})
export class PAttendanceComponent {
  attendance:AttendanceResponseModel = new AttendanceResponseModel();
  private service:PAttendanceService = inject(PAttendanceService);
  private route:ActivatedRoute = inject(ActivatedRoute);
  private router:Router = inject(Router);
  id =  this.route.snapshot.paramMap.get('id') as string;
  constructor() {
    this.service.component = this;
    this.service.getAttendances()
  }
  finishTask(){
    this.router.navigate(['main/participant/home'])
  }
}

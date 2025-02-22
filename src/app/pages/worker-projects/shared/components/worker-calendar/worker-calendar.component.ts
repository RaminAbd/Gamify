import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MonthModel } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/models/month.model';
import { ActiveDateInfoModel } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/models/active-date-info.model';
import { EducatorMeetingsRequestModel } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/models/educator-meetings-request.model';
import { QuizzesResponseModel } from '../../../../organization-quizzes/shared/models/quizzes-response.model';
import { GroupsResponseModel } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-groups/shared/models/groups-response.model';
import { ScheduleTaskModel } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/models/schedule-task.model';
import { WorkerCalendarService } from './worker-calendar.service';

@Component({
  selector: 'app-worker-calendar',
  imports: [NgForOf, NgIf, NgClass],
  templateUrl: './worker-calendar.component.html',
  styleUrl: './worker-calendar.component.scss',
})
export class WorkerCalendarComponent {
  private service: WorkerCalendarService = inject(WorkerCalendarService);

  showActivities: boolean = false;
  monthData: MonthModel = new MonthModel();
  weekDays: { name: string; shortName: string }[] = [];
  currentDate: Date = new Date();
  activeDateInfo: ActiveDateInfoModel = new ActiveDateInfoModel();
  meetingsRequest: EducatorMeetingsRequestModel =
    new EducatorMeetingsRequestModel();
  dayItemStateSaver: any;
  showMessage: boolean = false;
  quizzes: QuizzesResponseModel[] = [];
  groups: GroupsResponseModel[] = [];
  projectId: string;
  @Output() emitTask:any = new EventEmitter();
  @Input() set id(e: string) {
    if (e) {
      this.projectId = e
      this.service.buildDateRequest(new Date());
      this.weekDays = this.service.getWeekDays();
      this.monthData = this.service.updateMonthData(new Date());
    }
  }
  constructor() {
    this.service.component = this;
    this.meetingsRequest.educatorId = localStorage.getItem('userId') as string;
  }



  handlePreviousMonth(): void {
    const previousMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1,
    );
    this.currentDate = previousMonth;
    this.service.buildDateRequest(previousMonth);
  }

  handleNextMonth(): void {
    const nextMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1,
    );
    this.currentDate = nextMonth;
    this.service.buildDateRequest(nextMonth);
  }

  handleSetDateInfo(day: any): void {
    day.dateString = this.service.formatDate(day.date);
    this.activeDateInfo = day;
    this.showActivities = true;
    console.log(this.activeDateInfo);
  }

  isToday(date: Date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  isActive(day: any) {
    return (
      this.activeDateInfo.date &&
      this.activeDateInfo.date.getDate() === day.date.getDate() &&
      this.activeDateInfo.date.getMonth() === day.date.getMonth() &&
      this.activeDateInfo.date.getFullYear() === day.date.getFullYear()
    );
  }

  getTask(task:any) {
    this.emitTask.emit(task)
  }
}

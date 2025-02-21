import { Component, inject, Input } from '@angular/core';
import { NgClass, NgForOf, NgIf, SlicePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MonthModel } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/models/month.model';
import { ActiveDateInfoModel } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/models/active-date-info.model';
import { EducatorMeetingsRequestModel } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/models/educator-meetings-request.model';
import { QuizzesResponseModel } from '../../../../organization-quizzes/shared/models/quizzes-response.model';
import { GroupsResponseModel } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-groups/shared/models/groups-response.model';
import { ScheduleTaskModel } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/models/schedule-task.model';
import { WorkerCalendarService } from './worker-calendar.service';

@Component({
  selector: 'app-worker-calendar',
  imports: [NgForOf, NgIf, SlicePipe, NgClass],
  templateUrl: './worker-calendar.component.html',
  styleUrl: './worker-calendar.component.scss',
})
export class WorkerCalendarComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
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
  @Input() set id(e: string) {
    if (e) {
      this.projectId = e
      this.service.getGroups();
      this.service.getQuizzes();

      this.service.buildDateRequest(new Date());
      this.weekDays = this.service.getWeekDays();
      this.monthData = this.service.updateMonthData(new Date());
      // if (!this.isMobile()) this.handleSetDateInfo(this.dayItemStateSaver);
    }
  }
  constructor() {
    this.service.component = this;
    this.meetingsRequest.educatorId = localStorage.getItem('userId') as string;
  }

  isMobile(): boolean {
    console.log(window.matchMedia('(max-width: 1250px)').matches);
    return window.matchMedia('(max-width: 1250px)').matches;
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

  copyToClipboard(item: any) {
    navigator.clipboard
      .writeText(item.link)
      .then(() => {
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      })
      .catch((err) => console.error('Failed to copy: ', err));
  }

  getTasks(task: ScheduleTaskModel) {
    this.service.getTasks(task);
  }

  createTask() {
    this.service.openCreateDialog();
  }
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectCalendarService } from './project-calendar.service';
import { MonthModel } from './shared/models/month.model';
import { ActiveDateInfoModel } from './shared/models/active-date-info.model';
import { EducatorMeetingsRequestModel } from './shared/models/educator-meetings-request.model';
import { NgClass, NgForOf, NgIf, SlicePipe } from '@angular/common';
import { ScheduleTaskModel } from './shared/models/schedule-task.model';
import { QuizzesResponseModel } from '../../../../../../../organization-quizzes/shared/models/quizzes-response.model';
import { GroupsResponseModel } from '../project-groups/shared/models/groups-response.model';

@Component({
  selector: 'app-project-calendar',
  imports: [NgClass, NgForOf, NgIf, SlicePipe],
  templateUrl: './project-calendar.component.html',
  styleUrl: './project-calendar.component.scss',
})
export class ProjectCalendarComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private service: ProjectCalendarService = inject(ProjectCalendarService);
  id = this.route.parent?.snapshot.paramMap.get('id') as string;
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
  constructor() {
    this.service.component = this;
    this.meetingsRequest.educatorId = localStorage.getItem('userId') as string;
    this.service.getGroups();
    this.service.getQuizzes();

    this.service.buildDateRequest(new Date());
    this.weekDays = this.service.getWeekDays();
    this.monthData = this.service.updateMonthData(new Date());
    if (!this.isMobile()) this.handleSetDateInfo(this.dayItemStateSaver);
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

  joinToTask(task: ScheduleTaskModel) {}

  createTask() {
    this.service.openCreateDialog();
  }
}

import { inject, Injectable } from '@angular/core';
import { ProjectCalendarComponent } from './project-calendar.component';
import { TaskRootsApiService } from './shared/services/task-roots.api.service';
import { InvitationComponent } from '../project-groups/shared/pages/project-groups-details/shared/components/invitation/invitation.component';
import { DialogService } from 'primeng/dynamicdialog';
import { GroupsApiService } from '../project-groups/shared/services/groups.api.service';
import { QuizzesApiService } from '../../../../../../../organization-quizzes/shared/services/quizzes.api.service';
import { CreateTaskDialogComponent } from './shared/components/create-task-dialog/create-task-dialog.component';
import { ScheduleTaskModel } from './shared/models/schedule-task.model';
import { TasksListComponent } from './shared/components/tasks-list/tasks-list.component';
import { TasksApiService } from './shared/services/tasks.api.service';
import { FormatDate } from '../../../../../../../../core/extensions/format-date';

@Injectable({
  providedIn: 'root',
})
export class ProjectCalendarService {
  component: ProjectCalendarComponent;
  private service: TaskRootsApiService = inject(TaskRootsApiService);
  public dialogService: DialogService = inject(DialogService);
  public groupsService: GroupsApiService = inject(GroupsApiService);
  public quizService: QuizzesApiService = inject(QuizzesApiService);
  public tasksService: TasksApiService = inject(TasksApiService);
  constructor() {}

  getGroups() {
    this.groupsService.GetAllByProject(this.component.id).subscribe((resp) => {
      this.component.groups = resp.data;
    });
  }

  getQuizzes() {
    let id = localStorage.getItem('id') as string;
    this.quizService.GetAllByOrganization(id).subscribe((resp) => {
      this.component.quizzes = resp.data;
    });
  }

  getMeetings() {
    let req:any = {
      projectId: this.component.id,
    };
    if(this.component.userId) req.workerId = this.component.userId;
    this.service.getAllByProject(req).subscribe((resp) => {
      resp.data = resp.data.map((item: any) => ({
        ...item,
        time: this.extractTime(item.deadline),
      }));

      this.component.monthData = this.updateMonthData(
        this.component.currentDate,
        resp.data,
      );
      console.log(resp.data);
    });
  }

  extractTime(isoDate: string): string {
    const dateObj = new Date(isoDate);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  buildDateRequest(date: Date) {
    const today = date;
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 2);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.component.meetingsRequest.from = firstDay.toISOString();
    this.component.meetingsRequest.to = lastDay.toISOString();
    this.getMeetings();
  }

  getWeekDays(): { name: string; shortName: string }[] {
    const weekDays = [];
    const baseDate = new Date(Date.UTC(2024, 0, 1));

    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      weekDays.push({
        name: date.toLocaleString('default', { weekday: 'long' }),
        shortName: date.toLocaleString('default', { weekday: 'short' }),
      });
    }
    return weekDays;
  }

  updateMonthData(
    date: Date,
    scheduleData?: any,
  ): { monthName: string; weeks: any[] } {
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray: any[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({
        tasks: [],
        date: new Date(year, month, i),
        dayNumber: i,
        disabled: false,
      });
    }

    const weeks: any[] = [];
    let currentWeek: any = { days: [] };

    daysArray.forEach((dayItem, index) => {
      const dayOfWeek = dayItem.date.getDay();
      currentWeek.days.push(dayItem);
      if (dayOfWeek === 0 || index === daysArray.length - 1) {
        weeks.push(currentWeek);
        currentWeek = { days: [] };
      }
    });

    if (weeks[0].days.length && weeks[0].days[0].date.getDay() !== 1) {
      const previousMonthLastDay = new Date(year, month, 0).getDate();
      const daysToAdd = (weeks[0].days[0].date.getDay() || 7) - 1;
      const previousMonthDays = [];
      for (let i = daysToAdd; i > 0; i--) {
        previousMonthDays.push({
          tasks: [],
          date: new Date(year, month - 1, previousMonthLastDay - i + 1),
          dayNumber: previousMonthLastDay - i + 1,
          disabled: true,
        });
      }
      weeks[0].days = [...previousMonthDays, ...weeks[0].days];
    }

    const lastWeek = weeks[weeks.length - 1];
    if (
      lastWeek.days.length &&
      lastWeek.days[lastWeek.days.length - 1].date.getDay() !== 0
    ) {
      const nextMonthFirstDay = 1;
      const daysToAdd =
        7 - lastWeek.days[lastWeek.days.length - 1].date.getDay();
      for (let i = 0; i < daysToAdd; i++) {
        lastWeek.days.push({
          tasks: [],
          date: new Date(year, month + 1, nextMonthFirstDay + i),
          dayNumber: nextMonthFirstDay + i,
          disabled: true,
        });
      }
    }
    const allDays: any[] = [];
    weeks.forEach((week) => {
      allDays.push(...week.days);
    });

    allDays.forEach((dayItem) => {
      const year = dayItem.date.getFullYear();
      const month = dayItem.date.getMonth();
      const day = dayItem.date.getDate();
      if (scheduleData) {
        const finded = scheduleData.filter(
          (x: any) =>
            new Date(x.deadline).getMonth() === month &&
            new Date(x.deadline).getDate() === day,
        );

        dayItem.tasks = finded || [];
        dayItem.tasks.sort(
          (a: any, b: any) =>
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
        );
      }
      if (
        year === new Date().getFullYear() &&
        month === new Date().getMonth() &&
        day === new Date().getDate()
      ) {
        this.component.dayItemStateSaver = dayItem;
        if (!this.component.isMobile())
          this.component.handleSetDateInfo(this.component.dayItemStateSaver);
      }
    });
    return { monthName, weeks };
  }

  formatDate(dateString: string): { formattedDate: string; dayOfWeek: string } {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
    const dayOfWeek = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(date);
    return { formattedDate, dayOfWeek };
  }

  openCreateDialog() {
    const ref = this.dialogService.open(CreateTaskDialogComponent, {
      header: 'Add Task',
      width: '650px',
      data: {
        projectId: this.component.id,
        quizzes: this.component.quizzes,
        groups: this.component.groups,
      },
      style: {
        maxWidth: '95%',
      },
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        this.getMeetings();
      }
    });
  }

  getTasks(task: ScheduleTaskModel) {
    this.component.showActivities = false;
    const req = {
      rootId:task.id
    }
    this.tasksService.getAllByRoot(req).subscribe((resp) => {
      console.log(resp);
      let tasks = resp.data.map((item: any) => ({
        ...item,
        // startTime: new FormatDate(new Date(item.startTime), true).formattedDate,
        // deadline: new FormatDate(new Date(item.deadline), true).formattedDate,
        status: this.getStatus(item.status),
      }));
      console.log(tasks);
      this.openListDialog(tasks);
    });
  }

  openListDialog(tasks: any) {
    const ref = this.dialogService.open(TasksListComponent, {
      header: 'Select Task',
      width: '950px',
      data: {
        projectId: this.component.id,
        tasks: tasks,
      },
      style: {
        maxWidth: '95%',
      },
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        this.getMeetings();
      }
    });
  }

  private getStatus(status: any) {
    switch (status) {
      case 1:
        return 'Pending';
      case 2:
        return 'In progress';
      case 3:
        return 'Done';
      default:
        return 'Unknown';
    }
  }
}

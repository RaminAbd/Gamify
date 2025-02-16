import {inject, Injectable} from '@angular/core';
import {YouthWorkersApiService} from './shared/services/youth-workers.api.service';
import {AdminWorkersComponent} from './admin-workers.component';

@Injectable({
  providedIn: 'root'
})
export class AdminWorkersService {
  private service:YouthWorkersApiService = inject(YouthWorkersApiService);
  component: AdminWorkersComponent;
  constructor() { }

  getAll() {
    this.service.GetAll(this.service.serviceUrl).subscribe((resp) => {
      this.component.workers = resp.data;
    });
  }

  setCols() {
    this.component.cols = [
      { field: 'image', header: 'Image' },
      { field: 'firstName', header: 'First name' },
      { field: 'lastName', header: 'Last name' },
      { field: 'email', header: 'Email' },
    ];
  }
}

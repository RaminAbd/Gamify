import {Component, inject} from '@angular/core';
import {AdminWorkersService} from './admin-workers.service';
import {WorkersResponseModel} from './shared/models/workers-response.model';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-admin-workers',
  imports: [
    TableComponent
  ],
  templateUrl: './admin-workers.component.html',
  styleUrl: './admin-workers.component.scss'
})
export class AdminWorkersComponent {
  private service:AdminWorkersService = inject(AdminWorkersService);
  workers:WorkersResponseModel[]=[]
  cols: any[] = [];

  constructor() {
    this.service.component = this;
    this.service.getAll();
    this.service.setCols();
  }
}

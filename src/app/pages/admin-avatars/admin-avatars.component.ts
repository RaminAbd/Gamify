import { Component, inject } from '@angular/core';
import { OrganizationsResponseModel } from '../admin-organizations/shared/models/organizations-response.model';
import { AdminAvatarsService } from './admin-avatars.service';
import { AvatarsModel } from './shared/models/avatars.model';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-admin-avatars',
  imports: [TableComponent],
  templateUrl: './admin-avatars.component.html',
  styleUrl: './admin-avatars.component.scss',
})
export class AdminAvatarsComponent {
  private service: AdminAvatarsService = inject(AdminAvatarsService);
  avatars: AvatarsModel[] = [];
  cols: any[] = [];
  constructor() {
    this.service.component = this;
    this.service.getAll();
    this.service.setCols();
  }

  tableActionHandler(e: any) {
    this.service.tableActionHandler(e);
  }
}

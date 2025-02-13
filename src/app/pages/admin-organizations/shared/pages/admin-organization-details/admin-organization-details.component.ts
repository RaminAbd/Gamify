import { Component, inject } from '@angular/core';
import { AdminOrganizationDetailsService } from './admin-organization-details.service';
import { ActivatedRoute } from '@angular/router';
import { OrganizationsRequestModel } from '../../models/organizations-request.model';
import {UpsertHeadingComponent} from '../../../../../components/upsert-heading/upsert-heading.component';

@Component({
  selector: 'app-admin-organization-details',
  imports: [
    UpsertHeadingComponent
  ],
  templateUrl: './admin-organization-details.component.html',
  styleUrl: './admin-organization-details.component.scss',
})
export class AdminOrganizationDetailsComponent {
  private service: AdminOrganizationDetailsService = inject(
    AdminOrganizationDetailsService,
  );
  private route: ActivatedRoute = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id') as string;
  request: OrganizationsRequestModel = new OrganizationsRequestModel();
  constructor() {
    this.service.component = this;
    this.service.getItem();
  }
}

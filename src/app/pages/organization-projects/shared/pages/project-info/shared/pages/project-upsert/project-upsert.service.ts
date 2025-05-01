import { inject, Injectable } from '@angular/core';
import { ProjectDetailsService } from '../project-details/project-details.service';
import { BlobService } from '../../../../../../../../core/services/blob.service';
import { ProjectUpsertComponent } from './project-upsert.component';
import { ApplicationMessageCenterService } from '../../../../../../../../core/services/ApplicationMessageCenter.service';
import { ProjectsApiService } from '../../../../../../../admin-projects/shared/services/projects.api.service';
import { OrganizationsApiService } from '../../../../../../../admin-organizations/shared/services/organizations.api.service';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { FormatDate } from '../../../../../../../../core/extensions/format-date';

@Injectable({
  providedIn: 'root',
})
export class ProjectUpsertService {
  declare component: ProjectUpsertComponent;
  protected service: ProjectsApiService = inject(ProjectsApiService);
  private orgService: OrganizationsApiService = inject(OrganizationsApiService);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  private blob = inject(BlobService);
  constructor() {}

  GetAllOrganizations() {
    this.orgService.GetAll(this.orgService.serviceUrl).subscribe((resp) => {
      this.component.organizations = resp.data;
      if (this.component.id !== 'create') {
        this.getItem();
      }
    });
  }

  getItem() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .subscribe((resp) => {
        this.component.request = resp.data;
        this.component.request.organization = this.findOrganization(
          resp.data.organizationId,
        );
        this.component.startDate = new Date(resp.data.startDate);
        this.component.endDate = new Date(resp.data.endDate);

      });
  }

  findOrganization(id: string) {
    let org = this.component.organizations.find((x) => x.id === id);
    return org ? org.name : '';
  }

  formatDate(date: any) {
    return new FormatDate(new Date(date), true).formattedDate;
  }

  getFile(e: any, fileHandler: any) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.blob.UploadFile(fd).subscribe((resp: any) => {
        fileHandler(resp);
      });
    }
  }

  save() {
    if (this.component.startDate) {
      this.component.request.startDate = this.component.startDate.toISOString();
    }
    if (this.component.endDate) {
      this.component.request.endDate = this.component.endDate.toISOString();
    }
    this.component.request.organizationId = localStorage.getItem(
      'id',
    ) as string;

    if (this.isValid()) {
      if (this.component.id !== 'create') {
        this.update();
      } else {
        this.create();
      }
    } else {
      this.message.showWarningMessage('Fields are required.');
    }
  }

  isValid() {
    let result = true;
    if (
      !this.component.request.startDate ||
      !this.component.request.endDate ||
      !this.component.request.name ||
      !this.component.request.description ||
      !this.component.request.rewardRules
    )
      result = false;
    return result;
  }

  private update() {
    this.service
      .Update(this.service.serviceUrl, this.component.request)
      .subscribe((resp) => {
        if (resp.succeeded) {
          this.message.showSuccessMessage('Successfully updated.');
          this.getItem();
          this.component.isSubmitted = false;
        }
      });
  }

  private create() {
    this.service
      .Create(this.service.serviceUrl, this.component.request)
      .subscribe((resp) => {
        if (resp.succeeded) {
          this.message.showSuccessMessage('Successfully created.');
          this.component.location.back();

        }
      });
  }
}

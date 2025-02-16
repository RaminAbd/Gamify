import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ProjectUpsertService} from './project-upsert.service';
import { DatePickerModule } from 'primeng/datepicker';
import {ActivatedRoute} from '@angular/router';
import {ProjectsRequestModel} from '../../../../../../../admin-projects/shared/models/projects-request.model';
import {
  OrganizationsResponseModel
} from '../../../../../../../admin-organizations/shared/models/organizations-response.model';
import {UpsertHeadingComponent} from '../../../../../../../../components/upsert-heading/upsert-heading.component';
@Component({
  selector: 'app-project-upsert',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    DatePickerModule,
    UpsertHeadingComponent
  ],
  templateUrl: './project-upsert.component.html',
  styleUrl: './project-upsert.component.scss'
})
export class ProjectUpsertComponent{
  public service:ProjectUpsertService = inject(ProjectUpsertService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  id = this.route.parent?.snapshot.paramMap.get('id') as string;
  request: ProjectsRequestModel = new ProjectsRequestModel();
  organizations: OrganizationsResponseModel[] = [];
  constructor() {
    this.service.component = this;
    this.service.GetAllOrganizations();
  }

  startDate:any
  endDate:any
  isSubmitted = false;
  getFile(e: any) {
    this.request.image.fileLoading = true;
    this.service.getFile(e, (resp: any) => {
      this.request.image.fileLoading = false;
      this.request.image = resp.data;
      this.request.image.fakeFile = null;
      this.request.image.isValid = true;
    });
  }

  getFileName(fileName: string): string {
    if (fileName) {
      if (fileName.length > 30) {
        return this.changeFileName(fileName);
      } else {
        return fileName;
      }
    } else {
      return '';
    }
  }

  changeFileName(name: string) {
    return (
      name.substring(0, 10) +
      '...' +
      name.substring(name.length - 5, name.length)
    );
  }

  save() {
    this.service.save()
  }
}

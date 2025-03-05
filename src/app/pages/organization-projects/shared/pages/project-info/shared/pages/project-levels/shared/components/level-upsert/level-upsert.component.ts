import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApplicationMessageCenterService } from '../../../../../../../../../../../core/services/ApplicationMessageCenter.service';
import { LevelUpsertService } from './level-upsert.service';
import { LevelRequestModel } from '../../models/level-request.model';
import { NgClass, NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-level-upsert',
  imports: [FormsModule, NgIf, ReactiveFormsModule, DropdownModule, NgClass],
  templateUrl: './level-upsert.component.html',
  styleUrl: './level-upsert.component.scss',
})
export class LevelUpsertComponent {
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  private service: LevelUpsertService = inject(LevelUpsertService);
  request: LevelRequestModel = new LevelRequestModel();
  isSubmitted: boolean = false;
  types: any[] = [
    { name: 'Participant', value: 1 },
    { name: 'Worker', value: 2 },
  ];
  constructor() {
    this.service.component = this;
    if (this.config.data.data) this.request = structuredClone(this.config.data.data);
    this.request.projectId = this.config.data.projectId;
  }

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
    this.isSubmitted = true;
    this.service.save();
  }
}

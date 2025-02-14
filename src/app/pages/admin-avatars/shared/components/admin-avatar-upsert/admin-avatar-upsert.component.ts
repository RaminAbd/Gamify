import { Component, inject } from '@angular/core';
import { AvatarsModel } from '../../models/avatars.model';
import { AdminAvatarUpsertService } from './admin-avatar-upsert.service';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin-avatar-upsert',
  imports: [NgClass, FormsModule, NgIf],
  templateUrl: './admin-avatar-upsert.component.html',
  styleUrl: './admin-avatar-upsert.component.scss',
})
export class AdminAvatarUpsertComponent {
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  private service: AdminAvatarUpsertService = inject(AdminAvatarUpsertService);
  request: AvatarsModel = new AvatarsModel();
  isSubmitted = false;

  constructor() {
    this.service.component = this;
    if (this.config.data !== 'create') this.service.getInfo();
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
    this.service.save();
  }
}

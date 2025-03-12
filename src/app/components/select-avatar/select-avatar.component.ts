import { Component, inject } from '@angular/core';
import { AvatarsModel } from '../../pages/admin-avatars/shared/models/avatars.model';
import { SelectAvatarService } from './select-avatar.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-select-avatar',
  imports: [
    FormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './select-avatar.component.html',
  styleUrl: './select-avatar.component.scss',
})
export class SelectAvatarComponent {
  private service: SelectAvatarService = inject(SelectAvatarService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  avatars: AvatarsModel[] = [];
  selected:AvatarsModel = new AvatarsModel()
  constructor() {
    this.service.component = this;
    this.service.getAll();
  }

  save() {
    this.ref.close(this.selected.image);
  }
}

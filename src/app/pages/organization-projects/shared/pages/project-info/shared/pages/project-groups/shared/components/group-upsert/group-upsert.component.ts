import {Component, inject} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {
  ApplicationMessageCenterService
} from '../../../../../../../../../../../core/services/ApplicationMessageCenter.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-group-upsert',
  imports: [
    FormsModule
  ],
  templateUrl: './group-upsert.component.html',
  styleUrl: './group-upsert.component.scss'
})
export class GroupUpsertComponent {
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  name:string;
  constructor() {
    this.name = structuredClone(this.config.data);
  }

  save() {
    if (this.name) this.ref.close(this.name);
    else {
      this.message.showWarningMessage('Name field is required!');
    }
  }
}

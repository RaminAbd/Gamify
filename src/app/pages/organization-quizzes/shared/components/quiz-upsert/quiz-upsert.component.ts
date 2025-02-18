import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApplicationMessageCenterService } from '../../../../../core/services/ApplicationMessageCenter.service';

@Component({
  selector: 'app-quiz-upsert',
  imports: [FormsModule],
  templateUrl: './quiz-upsert.component.html',
  styleUrl: './quiz-upsert.component.scss',
})
export class QuizUpsertComponent {
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  name: string;
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

import {Component, inject} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {
  ApplicationMessageCenterService
} from '../../../../../../../../../../../core/services/ApplicationMessageCenter.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from "@angular/common";
import {LevelUpsertService} from '../../../../project-levels/shared/components/level-upsert/level-upsert.service';
import {FileModel} from '../../../../../../../../../../../core/models/File.model';

@Component({
  selector: 'app-group-upsert',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './group-upsert.component.html',
  styleUrl: './group-upsert.component.scss'
})
export class GroupUpsertComponent {
  private levelUpsertService:LevelUpsertService = inject(LevelUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  isSubmitted: boolean = false;
  name:string;
  image:FileModel = new FileModel();
  constructor() {
    if(this.config.data) {
      this.name = structuredClone(this.config.data.name);
      this.image = this.config.data.image ? this.config.data.image : new FileModel();
    }
  }

  save() {
    this.isSubmitted = true;
    if(!this.name ){
      this.message.showWarningMessage('Fields are required!');
    }
    else{
      const req = {
        name: this.name,
        image: this.image,
      }
      this.ref.close(req);
    }
  }

  getFile(e: any) {
    this.image.fileLoading = true;
    this.levelUpsertService.getFile(e, (resp: any) => {
      this.image.fileLoading = false;
      this.image = resp.data;
      this.image.fakeFile = null;
      this.image.isValid = true;
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
}

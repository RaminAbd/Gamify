import {inject, Injectable} from '@angular/core';
import {LevelsApiService} from '../../../../../../../participant-home/shared/services/levels.api.service';
import {ProjectLevelsComponent} from './project-levels.component';
import {Confirmation} from '../../../../../../../../core/extensions/confirmation';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ProjectLevelsService {
  private service:LevelsApiService = inject(LevelsApiService);
  private router: Router = inject(Router);
  private confirmationService: ConfirmationService =
    inject(ConfirmationService);
  component:ProjectLevelsComponent
  constructor() { }

  getAll(){
    this.service.GetAllByProject(this.component.id).subscribe(resp=>{
      this.component.levels = resp.data;
    })
  }

  setCols() {
    this.component.cols = [
      { field: 'name', header: 'Name' },
      { field: 'fromPoints', header: 'From Points' },
      { field: 'toPoints', header: 'To Points' },
      { field: 'crudActions', header: 'Actions' },
    ];
  }

  tableActionHandler(e: any) {
    // /main/organization/projects/099f46fd-a339-4bfe-a084-14cad9b6b51c/edit
    switch (e.type) {
      case 1:
        this.router.navigate(['/main/organization/projects', 'create', 'edit']);
        break;
      case 3:
        this.confirm(e.data.id);
        break;
      case 4:
        this.router.navigate(['/main/organization/projects', e.data.id]);
        break;
    }
  }

  confirm(id: string) {
    Confirmation.confirm(
      this.confirmationService,
      'Are you sure you want to delete this group project?',
      () => {
        this.delete(id);
      },
    );
  }

  private delete(id: string) {
    this.service.Delete(this.service.serviceUrl, id).subscribe((resp) => {
      this.getAll();
    });
  }
}

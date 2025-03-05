import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectLevelsService} from './project-levels.service';
import {LevelResponseModel} from '../../../../../../../participant-home/shared/models/level-response.model';
import {TableComponent} from '../../../../../../../../components/table/table.component';

@Component({
  selector: 'app-project-levels',
  imports: [
    TableComponent
  ],
  templateUrl: './project-levels.component.html',
  styleUrl: './project-levels.component.scss'
})
export class ProjectLevelsComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private service: ProjectLevelsService = inject(ProjectLevelsService);
  id = this.route.parent?.snapshot.paramMap.get('id') as string;
  levels:LevelResponseModel[]=[]
  cols: any[] = [];
  constructor() {
    this.service.component = this;
    this.service.getAll()
    this.service.setCols();
  }

  tableActionHandler(e: any) {
    this.service.tableActionHandler(e);
  }
}

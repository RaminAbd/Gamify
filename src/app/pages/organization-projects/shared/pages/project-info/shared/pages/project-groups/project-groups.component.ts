import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {GroupsResponseModel} from './shared/models/groups-response.model';
import {ProjectGroupsService} from './project-groups.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-groups',
  imports: [
    FormsModule,
    NgIf,
    NgStyle,
    NgForOf
  ],
  templateUrl: './project-groups.component.html',
  styleUrl: './project-groups.component.scss'
})
export class ProjectGroupsComponent {
  private service:ProjectGroupsService = inject(ProjectGroupsService);
  groups: GroupsResponseModel[] = [];
  filteredList: GroupsResponseModel[] = [];
  searchText: string;
  private route: ActivatedRoute = inject(ActivatedRoute);
  id = this.route.parent?.snapshot.paramMap.get('id') as string;

  constructor() {
    this.service.component = this;
    this.service.getGroups()
  }

  searchByName() {
    this.filteredList = this.groups.filter((obj) =>
      obj.name.toLowerCase().includes(this.searchText.toLowerCase()),
    );
    console.log(this.filteredList);
  }

  openDialog() {
    this.service.openDialog();
  }


  getGroupItem(item: GroupsResponseModel) {
    // this.router.navigate([
    //   '/main/educator/dashboard/course/info',
    //   item.courseId,
    //   'groups',
    //   item.id,
    // ]);
  }
}

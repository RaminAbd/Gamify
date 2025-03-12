import { inject, Injectable } from '@angular/core';
import { AvatarsApiService } from '../../pages/admin-avatars/shared/services/avatars.api.service';
import { SelectAvatarComponent } from './select-avatar.component';

@Injectable({
  providedIn: 'root',
})
export class SelectAvatarService {
  private service: AvatarsApiService = inject(AvatarsApiService);
  component: SelectAvatarComponent;
  constructor() {}

  getAll() {
    this.service.GetAll(this.service.serviceUrl).subscribe((resp) => {
      this.component.avatars = resp.data.map((avatar: any, i: number) => ({
        ...avatar,
        imageUrl: avatar.image.fileUrl,
        name: 'Avatar ' + i,
      }));
    });
  }
}

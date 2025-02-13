import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ConfirmDialog, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private titleService: Title = inject(Title);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data),
      )
      .subscribe((data) => {
        const title = data['title'] || 'Default Title';
        this.titleService.setTitle(title);
      });
  }
}

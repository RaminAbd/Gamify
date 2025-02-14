import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgForOf } from '@angular/common';
import {SignInService} from '../../auth/sign-in/sign-in.service';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink, RouterLinkActive, NgForOf],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
  @Input() sections: any[] = [];
  constructor(
    private sanitizer: DomSanitizer,
    private signInService: SignInService,
    private router: Router,
  ) {}

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  logout() {
    this.signInService.logout();
    this.router.navigate(['/auth']);
  }
}

import { Component, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgClass, NgForOf } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SignInService } from '../../auth/sign-in/sign-in.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgClass, NgForOf, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('menuExpand', [
      state(
        'open',
        style({
          width: '*',
          visibility: 'visible',
          display: 'block',
        }),
      ),
      state(
        'closed',
        style({
          width: '0px',
          visibility: 'hidden',
        }),
      ),
      transition('open <=> closed', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class HeaderComponent {
  showMenu: boolean = false;
  isHidden = false;
  @Input() sections: any[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private signInService: SignInService,
    private router: Router,
  ) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
    var questPages = document.querySelector('.burger') as Element;
    if (this.showMenu) {
      questPages.classList.add('active');
      setTimeout(() => {
        this.isHidden = true;
      }, 500);
    } else {
      questPages.classList.remove('active');
      this.isHidden = false;
    }
  }

  closeBurger() {
    this.showMenu = false;
    var questPages = document.querySelector('.burger') as Element;
    questPages.classList.remove('active');
  }

  onAnimationDone() {
    if (!this.showMenu) {
      this.isHidden = true;
    }
  }

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  logout() {
    this.signInService.logout();
    this.router.navigate(['/']);
  }
}

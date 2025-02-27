import {Component, ElementRef} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-quest-header',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './quest-header.component.html',
  styleUrl: './quest-header.component.scss',
  animations: [
    trigger('menuExpand', [
      state('open', style({
        height: '*', // Fully expanded
        visibility: 'visible'
      })),
      state('closed', style({
        height: '0px', // Collapsed
        visibility: 'hidden'
      })),
      transition('open <=> closed', [
        animate('500ms ease-in-out') // Animate height change
      ]),
    ])
  ]
})
export class QuestHeaderComponent {
  isOpen: boolean = false;

  constructor(private el: ElementRef) {}

  toggleMenu() {
    if(this.isOpen){
      this.isOpen = false;
    }
    else{
      this.isOpen = true;
    }
  }
}

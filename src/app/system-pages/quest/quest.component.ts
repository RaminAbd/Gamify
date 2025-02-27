import { Component } from '@angular/core';
import {QuestFooterComponent} from './shared/components/quest-footer/quest-footer.component';
import {QuestHeaderComponent} from './shared/components/quest-header/quest-header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-quest',
  imports: [
    QuestFooterComponent,
    QuestHeaderComponent,
    RouterOutlet
  ],
  templateUrl: './quest.component.html',
  styleUrl: './quest.component.scss'
})
export class QuestComponent {

}

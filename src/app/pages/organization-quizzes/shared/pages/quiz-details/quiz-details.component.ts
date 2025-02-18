import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-quiz-details',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './quiz-details.component.html',
  styleUrl: './quiz-details.component.scss',
})
export class QuizDetailsComponent {}

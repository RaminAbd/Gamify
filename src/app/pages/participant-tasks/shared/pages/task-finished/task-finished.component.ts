import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-finished',
  imports: [],
  templateUrl: './task-finished.component.html',
  styleUrl: './task-finished.component.scss'
})
export class TaskFinishedComponent {
  private router:Router = inject(Router)
  finishTask(){
    this.router.navigate(['main/participant/home'])
  }
}

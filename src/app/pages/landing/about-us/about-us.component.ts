import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  selected:number =1
}

import {Component, inject, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApplicationMessageCenterService} from '../../../core/services/ApplicationMessageCenter.service';
import {ContactService} from './contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private appMessage:ApplicationMessageCenterService = inject(ApplicationMessageCenterService);
  private fb: FormBuilder = inject(FormBuilder);
  private service:ContactService = inject(ContactService);
  isSubmitted: boolean = false;
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    subject: [''],
    email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
    message: ['', [Validators.required]],
  });

  constructor() {
    this.service.component = this;
  }
  sendMessage() {
    this.isSubmitted = true;
    console.log(this.form.value);
    this.service.send()
  }

}

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-upsert-heading',
  imports: [NgIf],
  templateUrl: './upsert-heading.component.html',
  styleUrl: './upsert-heading.component.scss',
})
export class UpsertHeadingComponent {
  public location: Location = inject(Location);
  @Output() save = new EventEmitter();
  @Output() back = new EventEmitter();
  @Input() name: string;
  @Input() showSave: boolean;
  @Input() useCustomBack: boolean;

  goBack() {
    if (this.useCustomBack) this.back.emit();
    else this.location.back();
  }
}

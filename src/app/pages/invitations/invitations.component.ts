import { Component, inject } from '@angular/core';
import { InvitationsService } from './invitations.service';
import { NgForOf, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-invitations',
  imports: [NgForOf, ReactiveFormsModule, FormsModule, NgStyle],
  templateUrl: './invitations.component.html',
  styleUrl: './invitations.component.scss',
})
export class InvitationsComponent {
  private service: InvitationsService = inject(InvitationsService);
  id: string = localStorage.getItem('id') as string;
  invitations: any[] = [];
  searchText: string;
  filteredList: any[] = [];
  constructor() {
    this.service.component = this;
    this.service.getAll();
  }
  searchByName() {
    this.filteredList = this.invitations.filter((obj) =>
      obj.email.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  accept(id: any) {
    this.service.accept(id);
  }
}

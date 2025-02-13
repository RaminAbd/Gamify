import {Injectable, OnDestroy} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ApplicationMessageCenterService {
  constructor(private messageService: MessageService) {
  }

  handleError(response: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: response.error,
      life: 5000,
    });
    return null;
  }

  showSuccessMessage(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      sticky: false,
    });
  }

  showErrorMessage( message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      sticky:false,
      life: 5000,
    });
  }

  showWarningMessage( message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: "Warning",
      detail: message,
      life: 5000,
      sticky: false,
    });
  }

  showInfoMessage( message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
      sticky: false,
    });
  }

}

import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { inject } from '@angular/core';

export class Confirmation {
  static confirm(
    confirmationService: ConfirmationService,
    message: string,
    success: () => void,
  ) {
    confirmationService.confirm({
      header: 'Confirmation',
      message: message,
      icon: 'pi pi-exclamation-circle',

      rejectButtonProps: {
        label: 'Cancel',
        icon: 'pi pi-times',
        outlined: true,
        size: 'small',
      },
      acceptButtonProps: {
        label:'Confirm',
        icon: 'pi pi-check',
        size: 'small',
      },
      accept: () => success(),
      reject: () => {},
    });
  }
}

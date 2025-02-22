import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
@Component({
  selector: 'app-tasks',
  imports: [ ZXingScannerModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  allowedFormats: BarcodeFormat[] = [BarcodeFormat.QR_CODE]; // Use BarcodeFormat Enum

  onScanSuccess(result: string) {
    console.log('Scanned QR Code:', result);
    alert(`QR Code Content: ${result}`);
  }
}

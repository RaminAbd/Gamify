import { Component, inject } from '@angular/core';
import { AttendanceResponseModel } from '../../models/attendance-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PScanService } from './p-scan.service';
import { NgIf } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { StorageService } from '../../../../../core/services/storage.service';

@Component({
  selector: 'app-p-scan',
  imports: [NgIf, ZXingScannerModule],
  templateUrl: './p-scan.component.html',
  styleUrl: './p-scan.component.scss',
})
export class PScanComponent {
  allowedFormats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];
  attendance: AttendanceResponseModel = new AttendanceResponseModel();
  private service: PScanService = inject(PScanService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private storage: StorageService = inject(StorageService);
  id = this.route.snapshot.paramMap.get('id') as string;
  isShown: boolean = false;
  showInfo: boolean = false;
  showWarning: boolean = false;
  constructor() {
    this.service.component = this;
    this.service.getAttendances();
  }

  onScanSuccess(result: string) {
    console.log(result);
    if (!this.isShown) {
      try {
        let res: any = JSON.parse(result);
        console.log(res);
        this.isShown = true;
        let st = this.storage.getObject('authResponse');
        res.assigneeId = st.id;
        this.service.scan(res);
      } catch (err) {
        console.log(err, err);
        this.showWarning = true;
      }
    }
  }
  finish() {
    this.router.navigate(['main/participant/tasks/finished']);
  }
}

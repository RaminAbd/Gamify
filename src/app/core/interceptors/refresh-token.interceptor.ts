import { Injectable } from '@angular/core';
import {
  throwError as observableThrowError,
  Observable,
  catchError,
} from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthApiService } from '../../auth/shared/services/auth.api.service';
import { AuthRequestModel } from '../../auth/shared/models/auth-request.model';
import { SignInService } from '../../auth/sign-in/sign-in.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(
    private storage: StorageService,
    private router: Router,
    private apiService: AuthApiService,
    private signInService: SignInService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          var req: AuthRequestModel = this.storage.getObject(
            'authRequest',
          ) as AuthRequestModel;
          if (req && req.remember) {
            this.SignIn(req);
          } else {
            this.navigateToSignIn().then(() => {});
          }
        }
        if (errorResponse.status === 403) {
          this.navigateToSignIn().then(() => {});
        }
        return observableThrowError(errorResponse);
      }),
    );
  }

  SignIn(req: AuthRequestModel) {
    this.apiService.SignIn(req).subscribe((resp: any) => {
      if (!resp.succeeded) {
        this.navigateToSignIn();
      } else {
        this.signInService.setToStorage(resp.data, req);
        this.signInService.navigateByRole(resp.data);
      }
    });
  }

  async navigateToSignIn() {
    await this.router.navigate(['/auth']).then();
  }
}

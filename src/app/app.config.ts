import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import Lara from '@primeng/themes/lara';
import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {TokenInterceptor} from './core/interceptors/token.interceptor';
import {RefreshTokenInterceptor} from './core/interceptors/refresh-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: false
        }
      },
    }),
    ConfirmationService,
    MessageService,
    DialogService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
  ]
};

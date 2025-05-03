import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';

import LocaleES from '@angular/common/locales/es-EA';
import LocaleFR from '@angular/common/locales/fr';
import { LocaleService } from './services/locale.service';

registerLocaleData(LocaleES, 'es');
registerLocaleData(LocaleFR, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      //useValue: 'fr',
      deps: [LocaleService],
      useFactory: (LocaleService: LocaleService) => LocaleService.getLocale,
    },
  ],
};

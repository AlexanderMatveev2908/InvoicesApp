import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { rootReducer } from '../core/store';
import { useRootApiMdw } from '../core/api/middleware/0_use_root_api';
import { useConfApiMdw } from '../core/api/middleware/1_use_conf_api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore(rootReducer),
    provideHttpClient(withFetch(), withInterceptors([useRootApiMdw, useConfApiMdw])),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};

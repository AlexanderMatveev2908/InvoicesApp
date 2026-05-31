import { Nullable } from '@/common/types/general';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  ApplicationRef,
  EnvironmentInjector,
  inject,
  Injectable,
  PLATFORM_ID,
  runInInjectionContext,
} from '@angular/core';
import { filter, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsePlatformSvc {
  private readonly platformID: object = inject(PLATFORM_ID);
  private readonly appRef: ApplicationRef = inject(ApplicationRef);
  private readonly injector: EnvironmentInjector = inject(EnvironmentInjector);

  public readonly isClient: boolean = isPlatformBrowser(this.platformID);
  public readonly isServer: boolean = isPlatformServer(this.platformID);

  public onClient<T>(cb: () => T): Nullable<T> {
    return this.isServer ? null : cb();
  }

  public onServer<T>(cb: () => T): Nullable<T> {
    return this.isClient ? null : cb();
  }

  private isStable(): Observable<boolean> {
    return this.appRef.isStable.pipe(filter(Boolean), take(1));
  }

  public whenStable<T>(cb: Observable<T>): Observable<T> {
    return this.isStable().pipe(switchMap(() => cb));
  }

  public inGlobalCtx(cb: () => void): void {
    runInInjectionContext(this.injector, cb);
  }
}

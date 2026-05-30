import { DestroyRef, inject, Injectable } from '@angular/core';
import { UseApiSvc } from '../../core/api';
import { Observable, retry } from 'rxjs';
import { ResApiT } from '../../common/types/api';
import { LibApiArgs } from '../../core/lib/data_structures/api_args';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class WakeUpApiSvc {
  private readonly api: UseApiSvc = inject(UseApiSvc);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  public wakeUp(): Observable<ResApiT<void>> {
    return this.api.get(LibApiArgs.withURL('/wake-up').toastOnFulfilled());
  }

  private readonly MAX_CALLS: number = 30;

  public poll(): Observable<ResApiT<void>> {
    return this.wakeUp().pipe(
      retry({
        delay: 1000,
        count: this.MAX_CALLS,
        resetOnSuccess: false,
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }
}

import { inject, Injectable } from '@angular/core';
import { UseApiSvc } from '../../core/api';
import { Observable } from 'rxjs';
import { ResApiT } from '../../common/types/api';
import { LibApiArgs } from '../../core/lib/data_structures/api_args';

@Injectable({
  providedIn: 'root',
})
export class WakeUpApiSvc {
  private readonly api: UseApiSvc = inject(UseApiSvc);

  public wakeUp(): Observable<ResApiT<void>> {
    return this.api.get(LibApiArgs.withURL('/wake-up'));
  }
}

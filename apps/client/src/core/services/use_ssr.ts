import { inject, Injectable, makeStateKey, StateKey, TransferState } from '@angular/core';
import { SsrKeyT } from '../../common/types/api';

@Injectable({
  providedIn: 'root',
})
export class UseSsrSvc {
  public readonly transferState: TransferState = inject(TransferState);
  public readonly wakeUpKey: StateKey<boolean> = makeStateKey<boolean>(SsrKeyT.WAKE_UP);
}

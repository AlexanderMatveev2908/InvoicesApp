import { SsrKeyT } from '@/common/types/api';
import { InvoiceT } from '@/common/types/invoices';
import { inject, Injectable, makeStateKey, StateKey, TransferState } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UseSsrSvc {
  public readonly transferState: TransferState = inject(TransferState);
  public readonly invoicesKey: StateKey<InvoiceT[]> = makeStateKey<InvoiceT[]>(SsrKeyT.INVOICES);
}

import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { computed, Injectable, Signal } from '@angular/core';
import { InvoicesStateT } from './reducer';
import { getInvoicesState } from './reducer/selector.';
import { InvoiceT } from '@/common/types/invoices';
import { InvoicesActT } from './reducer/actions';

@Injectable({
  providedIn: 'root',
})
export class InvoicesSlice extends UseKitSliceSvc {
  public get invoicesState(): Signal<InvoicesStateT> {
    return this.store.selectSignal(getInvoicesState);
  }

  public readonly invoices: Signal<InvoiceT[]> = computed(() => this.invoicesState().invoices);

  public refreshKey(): void {
    this.store.dispatch(InvoicesActT.REFRESH_KEY());
  }
}

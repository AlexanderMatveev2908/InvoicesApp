import { InvoiceStatusT } from '@/common/types/invoices';
import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UseFiltersInvoicesSvc {
  public readonly currFilters: WritableSignal<InvoiceStatusT[]> = signal([
    'DRAFT',
    'PENDING',
    'PAID',
  ]);

  public readonly toggleStatus = (opt: InvoiceStatusT): void => {
    if (this.currFilters().includes(opt))
      this.currFilters.set(this.currFilters().filter((el) => el !== opt));
    else this.currFilters.set([...this.currFilters(), opt]);
  };
}

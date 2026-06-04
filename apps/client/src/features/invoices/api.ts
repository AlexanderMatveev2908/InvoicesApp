import { UseApiSvc } from '@/core/api';
import { inject, Injectable } from '@angular/core';
import { InvoiceFormT } from './paperwork/InvoiceFormMng';
import { ApiStatusT, ObsOnOkT } from '@/common/types/api';
import { InvoiceT } from '@/common/types/invoices';
import { LibApiArgs } from '@/core/lib/api/args_api';

@Injectable({
  providedIn: 'root',
})
export class UseInvoicesApiSvc {
  private readonly useAoi: UseApiSvc = inject(UseApiSvc);

  public savePendingInvoice(invoice: InvoiceFormT): ObsOnOkT<{ invoice: InvoiceT }> {
    const bodyData = {
      ...invoice,
      status: 'PENDING',
    };

    return this.useAoi.post(LibApiArgs.withURL('/invoices').body(bodyData).toastOnFulfilled());
  }

  public saveDraftInvoice(invoice: InvoiceFormT): ObsOnOkT<{ invoice: InvoiceT }> {
    const bodyData = {
      ...invoice,
      status: 'DRAFT',
    };

    return this.useAoi.post(LibApiArgs.withURL('/invoices').body(bodyData).toastOnFulfilled());
  }
}

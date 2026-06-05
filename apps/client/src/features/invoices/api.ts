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

  public getInvoicesSsr(): ObsOnOkT<{ invoices: InvoiceT[] }> {
    return this.useAoi.get(LibApiArgs.withURL('/invoices').noToast());
  }

  public getInvoicesCsr(): ObsOnOkT<{ invoices: InvoiceT[] }> {
    return this.useAoi.get(LibApiArgs.withURL('/invoices').toastOnErr().pushOnErr());
  }

  public markAsPaid(invoiceId: number): ObsOnOkT<void> {
    return this.useAoi.patch(LibApiArgs.withURL(`/invoices/${invoiceId}`).toastOnFulfilled());
  }

  public deleteInvoice(invoiceId: number): ObsOnOkT<void> {
    return this.useAoi.delete(LibApiArgs.withURL(`/invoices/${invoiceId}`).toastOnFulfilled());
  }
}

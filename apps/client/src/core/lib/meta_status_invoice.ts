import { InvoiceStatusT } from '@/common/types/invoices';
import { ErrApp } from './errApp';

export class LibMetaStatusInvoice {
  public static draft: string = '#373B53';
  public static pending: string = '#FF8F00';
  public static paid: string = '#33D69F';

  public static bgByStatus(status: InvoiceStatusT): string {
    switch (status) {
      case 'DRAFT':
        return this.draft;
      case 'PENDING':
        return this.pending;
      case 'PAID':
        return this.paid;
      default:
        throw new ErrApp('status invoice invalid');
    }
  }
}

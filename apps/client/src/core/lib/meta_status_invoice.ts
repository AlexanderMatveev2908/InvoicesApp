import { InvoiceStatusT } from '@/common/types/invoices';
import { ErrApp } from './errApp';

export class LibMetaStatusInvoice {
  public static draft: string = '#373B53';
  public static pending: string = '#FF8F00';
  public static paid: string = '#33D69F';

  private static clrByStatus(status: InvoiceStatusT): string {
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

  public static bgByStatusWithDark(status: InvoiceStatusT, isDark: boolean): string {
    return isDark && status === 'DRAFT' ? '#979797' : this.clrByStatus(status);
  }

  public static txtByStatusWithDark(status: InvoiceStatusT, isDark: boolean): string {
    return isDark && status === 'DRAFT' ? '#DFE3FA' : this.clrByStatus(status);
  }
}

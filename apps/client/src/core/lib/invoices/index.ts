import { InvoiceT, PaymentTermT } from '@/common/types/invoices';

export class LibInvoices {
  public static calcDuePayment(originDate: string, paymentTerm: PaymentTermT): string {
    const days: number = Number(paymentTerm.match(/\d+/)?.[0] ?? 0);

    const dueDate: Date = new Date(originDate);
    dueDate.setDate(dueDate.getDate() + days);

    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(dueDate);
  }

  public static calcTotItemsInvoice(invoice: InvoiceT): number {
    return invoice.itemsList.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  }
}

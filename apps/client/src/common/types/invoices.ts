import { SqlTable } from './sql';

export type ItemInvoiceT = SqlTable<{
  name: string;
  qty: number;
  price: number;
  total: number;
}>;

export type PaymentTermT = 'Net 1 Day' | 'Net 7 Days' | 'Net 14 Days' | 'Net 30 Days';

export type InvoiceStatusT = 'DRAFT' | 'PENDING' | 'PAID';

export type InvoiceT = SqlTable<{
  clientID: string;

  billFrom: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  billTo: {
    clientName: string;
    clientMail: string;
    street: string;
    city: string;
    zip: string;
    country: string;
  };

  date: string;
  paymentTerm: PaymentTermT;
  description: string;

  items: ItemInvoiceT[];

  status: InvoiceStatusT;
}>;

import { SqlTable } from './sql';

export type ItemInvoiceT = SqlTable<{
  name: string;
  qty: number;
  price: number;
  invoiceId: number;
}>;

export type PaymentTermT = 'Net 1 Day' | 'Net 7 Days' | 'Net 14 Days' | 'Net 30 Days';

export type InvoiceStatusT = 'DRAFT' | 'PENDING' | 'PAID';

export type InvoiceT = SqlTable<{
  clientId: string;

  billFromStreet: string;
  billFromCity: string;
  billFromZip: string;
  billFromCountry: string;

  billToClientName: string;
  billToClientMail: string;
  billToStreet: string;
  billToCity: string;
  billToZip: string;
  billToCountry: string;

  invoiceDate: string;
  paymentTerm: PaymentTermT;
  description: string;
  status: InvoiceStatusT;

  itemsList: ItemInvoiceT[];
}>;

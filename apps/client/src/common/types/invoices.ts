export interface ItemInvoiceT {
  name: string;
  qty: number;
  price: number;
  total: number;
}

export type InvoiceStatusT = 'DRAFT' | 'PENDING' | 'PAID';

export interface InvoiceT {
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
  paymentTerm: string;
  description: string;

  items: ItemInvoiceT[];

  status: InvoiceStatusT;
}

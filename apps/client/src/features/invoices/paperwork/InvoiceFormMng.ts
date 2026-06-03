import z from 'zod';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class InvoiceFormMng {
  public static readonly schema = z.object({
    billFromStreet: z.string().min(3),
    billFromCity: z.string().min(3),
    billFromZip: z.string().min(3),
    billFromCountry: z.string().min(3),
    billToClientName: z.string().min(3),
    billToClientMail: z.string().min(3),
    billToStreet: z.string().min(3),
    billToCity: z.string().min(3),
    billToZip: z.string().min(3),
    billToCountry: z.string().min(3),
    invoiceDate: z.string().min(3),
    paymentTerm: z.string().min(3),
  });

  public static readonly form = new FormGroup({
    billFromStreet: new FormControl<string>('', {
      nonNullable: true,
    }),
    billFromCity: new FormControl<string>('', {
      nonNullable: true,
    }),
    billFromZip: new FormControl<string>('', {
      nonNullable: true,
    }),
    billFromCountry: new FormControl<string>('', {
      nonNullable: true,
    }),
    billToClientName: new FormControl<string>('', {
      nonNullable: true,
    }),
    billToClientMail: new FormControl<string>('', {
      nonNullable: true,
    }),
    billToStreet: new FormControl<string>('', {
      nonNullable: true,
    }),
    billToCity: new FormControl<string>('', {
      nonNullable: true,
    }),
    billToZip: new FormControl<string>('', {
      nonNullable: true,
    }),
    billToCountry: new FormControl<string>('', {
      nonNullable: true,
    }),
    invoiceDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
    }),
    paymentTerm: new FormControl<string>('Chose Term', {
      nonNullable: true,
    }),
  });
}

export type InvoiceFormT = z.infer<typeof InvoiceFormMng.schema>;

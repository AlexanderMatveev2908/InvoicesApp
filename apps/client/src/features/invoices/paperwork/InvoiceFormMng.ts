import z from 'zod';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export type InvoiceFormItemT = {
  name: string;
  qty: number;
  price: string;
};

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
    paymentTerm: z
      .string()
      .min(3)
      .refine((val) => val !== 'Chose Term', 'Chose Payment method'),
    description: z.string().min(3),

    itemsList: z
      .array(
        z.object({
          name: z.string().min(3),
          qty: z.string().regex(/^[1-9]\d*$/, 'Quantity must be a positive integer'),
          price: z
            .string()
            .regex(/^(0|[1-9]\d*)(\.\d{1,2})?$/, 'Price must have at most 2 decimal places'),
        }),
      )
      .min(1, 'At least one item is required'),
  });

  public static readonly form = () =>
    new FormGroup({
      billFromStreet: new FormControl<string>('street', {
        nonNullable: true,
      }),
      billFromCity: new FormControl<string>('city', {
        nonNullable: true,
      }),
      billFromZip: new FormControl<string>('zip', {
        nonNullable: true,
      }),
      billFromCountry: new FormControl<string>('country', {
        nonNullable: true,
      }),
      billToClientName: new FormControl<string>('client name', {
        nonNullable: true,
      }),
      billToClientMail: new FormControl<string>('john@gmail.com', {
        nonNullable: true,
      }),
      billToStreet: new FormControl<string>('street', {
        nonNullable: true,
      }),
      billToCity: new FormControl<string>('city', {
        nonNullable: true,
      }),
      billToZip: new FormControl<string>('zip', {
        nonNullable: true,
      }),
      billToCountry: new FormControl<string>('country', {
        nonNullable: true,
      }),
      invoiceDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
        nonNullable: true,
      }),
      paymentTerm: new FormControl<string>('Chose Term', {
        nonNullable: true,
      }),
      description: new FormControl<string>('description', {
        nonNullable: true,
      }),
      itemsList: new FormArray([
        new FormGroup({
          name: new FormControl('item 1', {
            nonNullable: true,
          }),

          qty: new FormControl('5', {
            nonNullable: true,
          }),

          price: new FormControl('6', {
            nonNullable: true,
          }),
        }),
      ]),
    });
}

export type InvoiceFormT = z.infer<typeof InvoiceFormMng.schema>;

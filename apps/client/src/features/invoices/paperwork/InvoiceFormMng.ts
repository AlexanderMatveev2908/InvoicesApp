import z from 'zod';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class InvoiceFormMng {
  public static readonly schema = z.object({
    billFromStreet: z.string().min(3),
  });

  public static readonly form = new FormGroup({
    billFromStreet: new FormControl<string>('', {
      nonNullable: true,
    }),
  });
}

export type InvoiceFormT = z.infer<typeof InvoiceFormMng.schema>;

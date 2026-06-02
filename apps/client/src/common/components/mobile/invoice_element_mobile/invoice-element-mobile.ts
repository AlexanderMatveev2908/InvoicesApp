import { InvoiceT } from '@/common/types/invoices';
import { UseMetaStatusDir } from '@/core/directives/use_meta_status_dir';
import { LibInvoices } from '@/core/lib/invoices';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-invoice-element-mobile',
  imports: [NgClass],
  templateUrl: './invoice-element-mobile.html',
  styleUrl: './invoice-element-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceElementMobile extends UseMetaStatusDir {
  public readonly inv: InputSignal<InvoiceT> = input.required();

  public calcDueDate(invoice: InvoiceT): string {
    return `Due ${LibInvoices.calcDuePayment(invoice.date, invoice.paymentTerm)}`;
  }

  public calcTotItems(invoice: InvoiceT): string {
    const tot: number = LibInvoices.calcTotItems(invoice);

    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(tot);
  }
}

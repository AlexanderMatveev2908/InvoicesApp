import { InvoiceT } from '@/common/types/invoices';
import { UseMetaStatusDir } from '@/core/directives/use_meta_status_dir';
import { LibInvoices } from '@/core/lib/invoices';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-element-mobile',
  imports: [NgClass, RouterLink],
  templateUrl: './invoice-element-mobile.html',
  styleUrl: './invoice-element-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceElementMobile extends UseMetaStatusDir {
  public readonly inv: InputSignal<InvoiceT> = input.required();

  public calcDueDate(invoice: InvoiceT): string {
    return `Due ${LibInvoices.calcDuePayment(invoice.invoiceDate, invoice.paymentTerm)}`;
  }

  public calcTotItems(invoice: InvoiceT): string {
    const tot: number = LibInvoices.calcTotItemsInvoice(invoice);

    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(tot);
  }

  public pathID: Signal<string> = computed(() => `/invoices/${this.inv().id}`);
}

import { SvgT } from '@/common/types/general';
import { InvoiceT } from '@/common/types/invoices';
import { LibInvoices } from '@/core/lib/invoices';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { SvgAdvArrowRight } from '../../svgs/advanced/arrow_right/arrow-right';
import { UseMetaStatusDir } from '@/core/directives/use_meta_status_dir';

@Component({
  selector: 'app-invoice-element-tablet-desktop',
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './invoice-element-tablet-desktop.html',
  styleUrl: './invoice-element-tablet-desktop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceElementTabletDesktop extends UseMetaStatusDir {
  public readonly inv: InputSignal<InvoiceT> = input.required();

  public readonly SvgArrow: SvgT = SvgAdvArrowRight;

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

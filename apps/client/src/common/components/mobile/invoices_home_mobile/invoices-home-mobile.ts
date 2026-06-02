import { InvoiceT } from '@/common/types/invoices';
import { LibInvoices } from '@/core/lib/invoices';
import { LibMetaStatusInvoice } from '@/core/lib/meta_status_invoice';
import { UseThemeSvc } from '@/core/services/use_theme';
import { mockInvoices } from '@/mock/data';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-invoices-home-mobile',
  imports: [NgClass],
  templateUrl: './invoices-home-mobile.html',
  styleUrl: './invoices-home-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesHomeMobile {
  public readonly appMockInvoices: InvoiceT[] = mockInvoices;

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

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

  public getCssStatus(invoice: InvoiceT): string {
    return LibMetaStatusInvoice.bgByStatus(invoice.status);
  }
}

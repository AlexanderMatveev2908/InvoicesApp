import { Optional } from '@/common/types/general';
import { InvoiceT } from '@/common/types/invoices';
import { UseNavSvc } from '@/core/services/use_nav';
import { mockInvoices } from '@/mock/data';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { InvoicePageElement } from '@/common/components/mobile/invoice_page_element/invoice-page-element';

@Component({
  selector: 'app-invoice-page',
  imports: [InvoicePageElement],
  templateUrl: './invoice-page.html',
  styleUrl: './invoice-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePage {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly currInvoice: Signal<Optional<InvoiceT>> = computed(() =>
    mockInvoices.find((el: InvoiceT) => el.id === this.useNav.pathVariables()?.['invoiceID']),
  );
}

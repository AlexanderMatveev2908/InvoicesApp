import { Optional } from '@/common/types/general';
import { InvoiceT } from '@/common/types/invoices';
import { UseNavSvc } from '@/core/services/use_nav';
import { mockInvoices } from '@/mock/data';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { InvoicePageElementMobile } from '@/common/components/mobile/invoice_page_element_mobile/invoice-page-element-mobile';

@Component({
  selector: 'app-invoice-page',
  imports: [InvoicePageElementMobile],
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

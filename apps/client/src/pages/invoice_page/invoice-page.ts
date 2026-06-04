import { Optional } from '@/common/types/general';
import { InvoiceT } from '@/common/types/invoices';
import { UseNavSvc } from '@/core/services/use_nav';
import { mockInvoices } from '@/mock/data';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { InvoicePageElementMobile } from '@/common/components/mobile/invoice_page_element_mobile/invoice-page-element-mobile';
import { Popup } from '@/common/components/popup/popup';

@Component({
  selector: 'app-invoice-page',
  imports: [InvoicePageElementMobile, Popup],
  templateUrl: './invoice-page.html',
  styleUrl: './invoice-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePage {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly isPop: WritableSignal<boolean> = signal(false);

  public readonly toggle = (): void => {
    this.isPop.set(!this.isPop());
  };

  public readonly descriptionDelete: Signal<string> = computed(
    () =>
      `Are you sure you want to delete invoice #${this.currInvoice()?.clientID}? This action cannot be undone.`,
  );

  public readonly deleteCb = (): void => {
    console.log('clicked');
  };

  public readonly currInvoice: Signal<Optional<InvoiceT>> = computed(() =>
    mockInvoices.find((el: InvoiceT) => el.id === this.useNav.pathVariables()?.['invoiceID']),
  );
}

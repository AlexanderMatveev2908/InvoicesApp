import { Optional } from '@/common/types/general';
import { InvoiceT } from '@/common/types/invoices';
import { UseNavSvc } from '@/core/services/use_nav';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { InvoicePageElementMobile } from '@/common/components/mobile/invoice_page_element_mobile/invoice-page-element-mobile';
import { Popup } from '@/common/components/popup/popup';
import { InvoicesSlice } from '@/features/invoices/slice';
import { PageWrapper } from '@/common/components/hoc/page_wrapper/page-wrapper';

@Component({
  selector: 'app-invoice-page',
  imports: [InvoicePageElementMobile, Popup, PageWrapper],
  templateUrl: './invoice-page.html',
  styleUrl: './invoice-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePage implements OnInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  public readonly invoicesSLice: InvoicesSlice = inject(InvoicesSlice);

  public readonly isPop: WritableSignal<boolean> = signal(false);

  public readonly toggle = (): void => {
    this.isPop.set(!this.isPop());
  };

  public readonly descriptionDelete: Signal<string> = computed(
    () =>
      `Are you sure you want to delete invoice #${this.currInvoice()?.clientId}? This action cannot be undone.`,
  );

  public readonly deleteCb = (): void => {
    console.log('clicked');
  };

  public readonly currInvoice: Signal<Optional<InvoiceT>> = computed(() =>
    this.invoicesSLice
      .invoices()
      .find((el: InvoiceT) => el.id === +this.useNav.pathVariables()?.['invoiceID']),
  );

  ngOnInit(): void {}
}

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
import { UseApiTrackerHk } from '@/core/hooks/use_api_tracker';
import { UseInvoicesApiSvc } from '@/features/invoices/api';
import { finalize, tap } from 'rxjs';
import { InvoicesFormTabletDesktop } from '@/features/invoices/forms/invoices_form_tablet_desktop/invoices-form-tablet-desktop';
import { InvoiceFormT } from '@/features/invoices/paperwork/InvoiceFormMng';

@Component({
  selector: 'app-invoice-page',
  imports: [InvoicePageElementMobile, Popup, PageWrapper, InvoicesFormTabletDesktop],
  templateUrl: './invoice-page.html',
  styleUrl: './invoice-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePage implements OnInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  public readonly invoicesSLice: InvoicesSlice = inject(InvoicesSlice);
  private readonly useInvoicesApi: UseInvoicesApiSvc = inject(UseInvoicesApiSvc);

  public readonly deletingTracker = new UseApiTrackerHk();

  private readonly invoicesSlice: InvoicesSlice = inject(InvoicesSlice);
  private readonly useInvoicesAPi: UseInvoicesApiSvc = inject(UseInvoicesApiSvc);

  public readonly isPop: WritableSignal<boolean> = signal(false);

  public readonly toggle = (): void => {
    this.isPop.set(!this.isPop());
  };

  public readonly saveTracker = new UseApiTrackerHk();

  public readonly submitSave = (data: InvoiceFormT): void => {
    const invoiceId: number = Number(this.currInvoice()?.id ?? 0);

    this.saveTracker
      .track(
        this.useInvoicesApi
          .saveChanges(invoiceId, { ...data, status: this.currInvoice()?.status! })
          .pipe(
            tap(() => {
              this.invoicesSlice.refreshKey();
              this.useNav.replace(`/invoices/${invoiceId}`, { from: null });
              this.invoicesSLice.toggleInvoiceBar();
            }),
          ),
      )
      .subscribe();
  };

  public readonly descriptionDelete: Signal<string> = computed(
    () =>
      `Are you sure you want to delete invoice #${this.currInvoice()?.clientId}? This action cannot be undone.`,
  );

  public readonly currInvoice: Signal<Optional<InvoiceT>> = computed(() =>
    this.invoicesSLice
      .invoices()
      .find((el: InvoiceT) => el.id === +this.useNav.pathVariables()?.['invoiceID']),
  );

  public readonly cbDelete = (): void => {
    const id: number = Number(this.currInvoice()?.id ?? 0);

    this.deletingTracker
      .track(
        this.useInvoicesAPi.deleteInvoice(id).pipe(
          finalize(() => {
            this.toggle();
            this.invoicesSlice.refreshKey();
            this.useNav.replace('/', { from: null });
          }),
        ),
      )
      .subscribe();
  };

  ngOnInit(): void {}
}

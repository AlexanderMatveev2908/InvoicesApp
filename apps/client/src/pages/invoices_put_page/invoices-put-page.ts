import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { GoBackMobile } from '@/common/components/mobile/go_back_mobile/go-back-mobile';
import { NgClass } from '@angular/common';
import { InvoicesFormMobile } from '@/features/invoices/forms/invoices_form_mobile/invoices-form-mobile';
import { UseThemeSvc } from '@/core/services/use_theme';
import { UseNavSvc } from '@/core/services/use_nav';
import { InvoiceT } from '@/common/types/invoices';
import { Optional } from '@/common/types/general';
import { InvoicesSlice } from '@/features/invoices/slice';
import { UseApiTrackerHk } from '@/core/hooks/use_api_tracker';
import { InvoiceFormT } from '@/features/invoices/paperwork/InvoiceFormMng';
import { UseInvoicesApiSvc } from '@/features/invoices/api';
import { PageWrapper } from '@/common/components/hoc/page_wrapper/page-wrapper';

@Component({
  selector: 'app-invoices-put-page',
  imports: [GoBackMobile, NgClass, InvoicesFormMobile, PageWrapper],
  templateUrl: './invoices-put-page.html',
  styleUrl: './invoices-put-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesPutPage {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly useNav: UseNavSvc = inject(UseNavSvc);
  public readonly invoicesSlice: InvoicesSlice = inject(InvoicesSlice);

  public readonly useInvoicesApi: UseInvoicesApiSvc = inject(UseInvoicesApiSvc);

  public readonly saveTracker = new UseApiTrackerHk();
  public readonly draftTracker = new UseApiTrackerHk();

  public readonly submitSave = (data: InvoiceFormT): void => {
    this.saveTracker.track(this.useInvoicesApi.savePendingInvoice(data));
  };

  public readonly currInvoice: Signal<Optional<InvoiceT>> = computed(() =>
    this.invoicesSlice
      .invoices()
      .find((el: InvoiceT) => el.id === +this.useNav.pathVariables()?.['invoiceID']),
  );
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  WritableSignal,
} from '@angular/core';
import { GoBackMobile } from '@/common/components/mobile/go_back_mobile/go-back-mobile';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { InvoicesFormMobile } from '@/features/invoices/forms/invoices_form_mobile/invoices-form-mobile';
import { UseInvoicesApiSvc } from '@/features/invoices/api';
import { UseApiTrackerHk } from '@/core/hooks/use_api_tracker';
import { InvoiceFormT } from '@/features/invoices/paperwork/InvoiceFormMng';

@Component({
  selector: 'app-invoices-post-page',
  imports: [GoBackMobile, NgClass, InvoicesFormMobile],
  templateUrl: './invoices-post-page.html',
  styleUrl: './invoices-post-page.scss',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesPostPage {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public readonly useInvoicesApi: UseInvoicesApiSvc = inject(UseInvoicesApiSvc);

  public readonly saveTracker = new UseApiTrackerHk();
  public readonly draftTracker = new UseApiTrackerHk();

  public readonly submitSave = (data: InvoiceFormT): void => {
    this.saveTracker.track(this.useInvoicesApi.savePendingInvoice(data)).subscribe();
  };

  public readonly submitDraft = (data: InvoiceFormT): void => {
    this.draftTracker.track(this.useInvoicesApi.saveDraftInvoice(data)).subscribe();
  };
}

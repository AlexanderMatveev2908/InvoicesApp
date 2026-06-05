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
import { InvoicesSlice } from '@/features/invoices/slice';
import { UseNavSvc } from '@/core/services/use_nav';
import { switchMap, tap } from 'rxjs';

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

  private readonly invoicesSlice: InvoicesSlice = inject(InvoicesSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly useInvoicesApi: UseInvoicesApiSvc = inject(UseInvoicesApiSvc);

  public readonly saveTracker = new UseApiTrackerHk();
  public readonly draftTracker = new UseApiTrackerHk();

  public readonly submitSave = (data: InvoiceFormT): void => {
    this.saveTracker
      .track(
        this.useInvoicesApi.savePendingInvoice(data).pipe(
          tap(() => {
            this.invoicesSlice.refreshKey();
            this.useNav.replace('/', { from: null });
          }),
        ),
      )
      .subscribe();
  };

  public readonly submitDraft = (data: InvoiceFormT): void => {
    this.draftTracker
      .track(
        this.useInvoicesApi.saveDraftInvoice(data).pipe(
          tap(() => {
            this.invoicesSlice.refreshKey();
            this.useNav.replace('/', { from: null });
          }),
        ),
      )
      .subscribe();
  };
}

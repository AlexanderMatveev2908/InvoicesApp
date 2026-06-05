import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { Optional } from '@/common/types/general';
import { InvoiceT, ItemInvoiceT } from '@/common/types/invoices';
import { LibFormat } from '@/core/lib/data_structures/format';
import { LibInvoices } from '@/core/lib/invoices';
import { NgClass } from '@angular/common';
import { UseMetaStatusDir } from '@/core/directives/use_meta_status_dir';
import { GoBackMobile } from '../go_back_mobile/go-back-mobile';
import { RouterLink } from '@angular/router';
import { InvoicesSlice } from '@/features/invoices/slice';
import { UseInvoicesApiSvc } from '@/features/invoices/api';
import { UseApiTrackerHk } from '@/core/hooks/use_api_tracker';
import { finalize, tap } from 'rxjs';
import { UseNavSvc } from '@/core/services/use_nav';

@Component({
  selector: 'app-invoice-page-element-mobile',
  imports: [NgClass, GoBackMobile, RouterLink],
  templateUrl: './invoice-page-element-mobile.html',
  styleUrl: './invoice-page-element-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePageElementMobile extends UseMetaStatusDir {
  public readonly isPop: InputSignal<boolean> = input.required();
  public readonly toggle: InputSignal<() => void> = input.required();

  public readonly markingTracker = new UseApiTrackerHk();
  private readonly invoicesSlice: InvoicesSlice = inject(InvoicesSlice);
  private readonly useInvoicesAPi: UseInvoicesApiSvc = inject(UseInvoicesApiSvc);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public markAsPaid(): void {
    const id: number = Number(this.currInvoice()?.id ?? 0);

    this.markingTracker
      .track(
        this.useInvoicesAPi.markAsPaid(id).pipe(
          tap(() => {
            this.invoicesSlice.refreshKey();
            this.useNav.replace(`/invoices/${this.currInvoice()?.id}`, { from: null });
          }),
        ),
      )
      .subscribe();
  }

  public readonly currInvoice: InputSignal<Optional<InvoiceT>> = input.required();

  public readonly editLink: Signal<string> = computed(
    () => `/invoices-put/${this.currInvoice()?.id}`,
  );

  public formatDate(): string {
    return LibFormat.formatDate(this.currInvoice()?.invoiceDate!);
  }

  public paymentDue(): string {
    return LibInvoices.calcDuePayment(
      this.currInvoice()?.invoiceDate!,
      this.currInvoice()?.paymentTerm!,
    );
  }

  public formatMoney(price: number): string {
    return LibFormat.formatMoney(price);
  }

  public calcTotInvoice(): string {
    return this.formatMoney(LibInvoices.calcTotItemsInvoice(this.currInvoice()!));
  }

  public calcTotItem(item: ItemInvoiceT): string {
    return this.formatMoney(item.price * item.qty);
  }
}

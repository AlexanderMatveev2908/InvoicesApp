import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { Optional } from '@/common/types/general';
import { InvoiceT } from '@/common/types/invoices';
import { LibFormat } from '@/core/lib/data_structures/format';
import { LibInvoices } from '@/core/lib/invoices';
import { NgClass } from '@angular/common';
import { UseMetaStatusDir } from '@/core/directives/use_meta_status_dir';
import { GoBackMobile } from '../go_back_mobile/go-back-mobile';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-page-element-mobile',
  imports: [NgClass, GoBackMobile, RouterLink],
  templateUrl: './invoice-page-element-mobile.html',
  styleUrl: './invoice-page-element-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePageElementMobile extends UseMetaStatusDir {
  public readonly currInvoice: InputSignal<Optional<InvoiceT>> = input.required();

  public readonly editLink: Signal<string> = computed(
    () => `/invoices-put/${this.currInvoice()?.id}`,
  );

  public formatDate(): string {
    return LibFormat.formatDate(this.currInvoice()?.date!);
  }

  public paymentDue(): string {
    return LibInvoices.calcDuePayment(this.currInvoice()?.date!, this.currInvoice()?.paymentTerm!);
  }

  public formatMoney(price: number): string {
    return LibFormat.formatMoney(price);
  }

  public calcTotInvoice(): string {
    return this.formatMoney(LibInvoices.calcTotItemsInvoice(this.currInvoice()!));
  }
}

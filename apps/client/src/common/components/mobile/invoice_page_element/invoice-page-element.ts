import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { Optional } from '@/common/types/general';
import { InvoiceT } from '@/common/types/invoices';
import { LibFormat } from '@/core/lib/data_structures/format';
import { LibInvoices } from '@/core/lib/invoices';
import { NgClass } from '@angular/common';
import { UseMetaStatusDir } from '@/core/directives/use_meta_status_dir';
import { GoBackMobile } from '../go_back_mobile/go-back-mobile';

@Component({
  selector: 'app-invoice-page-element',
  imports: [NgClass, GoBackMobile],
  templateUrl: './invoice-page-element.html',
  styleUrl: './invoice-page-element.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePageElement extends UseMetaStatusDir {
  public readonly currInvoice: InputSignal<Optional<InvoiceT>> = input.required();

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

import { UseNavSvc } from '@/core/services/use_nav';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { SvgAdvArrowLeft } from '../../svgs/advanced/arrow_left/arrow-left';
import { Optional, SvgT } from '@/common/types/general';
import { InvoiceT } from '@/common/types/invoices';
import { LibFormat } from '@/core/lib/data_structures/format';
import { LibInvoices } from '@/core/lib/invoices';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UseMetaStatusDir } from '@/core/directives/use_meta_status_dir';

@Component({
  selector: 'app-invoice-page-element',
  imports: [NgComponentOutlet, NgClass, RouterLink],
  templateUrl: './invoice-page-element.html',
  styleUrl: './invoice-page-element.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePageElement extends UseMetaStatusDir {
  public readonly SvgArrow: SvgT = SvgAdvArrowLeft;

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

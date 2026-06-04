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
import { mockInvoices } from '@/mock/data';
import { InvoiceT } from '@/common/types/invoices';
import { Optional } from '@/common/types/general';

@Component({
  selector: 'app-invoices-put-page',
  imports: [GoBackMobile, NgClass, InvoicesFormMobile],
  templateUrl: './invoices-put-page.html',
  styleUrl: './invoices-put-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesPutPage {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly currInvoice: Signal<Optional<InvoiceT>> = computed(() =>
    mockInvoices.find((el: InvoiceT) => el.id === this.useNav.pathVariables()?.['invoiceID']),
  );
}

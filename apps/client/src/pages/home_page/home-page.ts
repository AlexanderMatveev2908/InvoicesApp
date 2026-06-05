import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { InvoicesHomeMobileTabletDesktop } from '@/common/components/mixed/invoices_home_mobile_tablet_desktop/invoices-home-mobile-tablet-desktop';
import { NgClass } from '@angular/common';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NoInvoicesMobileTabletDesktop } from '@/common/components/mixed/no_invoices_mobile_tablet_desktop/no-invoices-mobile-tablet-desktop';
import { HeaderHomeMobileTabletDesktop } from '@/common/components/mixed/header_home_mobile_tablet_desktop/header-home-mobile-tablet-desktop';
import { InvoicesSlice } from '@/features/invoices/slice';
import { UseFiltersInvoicesSvc } from '@/core/services/use_filters_invoices';
import { InvoiceT } from '@/common/types/invoices';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { InvoicesFormTabletDesktop } from '@/features/invoices/forms/invoices_form_tablet_desktop/invoices-form-tablet-desktop';
import { InvoiceFormT } from '@/features/invoices/paperwork/InvoiceFormMng';

@Component({
  selector: 'app-home-page',
  imports: [
    HeaderHomeMobileTabletDesktop,
    InvoicesHomeMobileTabletDesktop,
    NgClass,
    NoInvoicesMobileTabletDesktop,
    InvoicesFormTabletDesktop,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly invoicesSlice: InvoicesSlice = inject(InvoicesSlice);

  public readonly useFilters: UseFiltersInvoicesSvc = inject(UseFiltersInvoicesSvc);

  public readonly filtered: Signal<InvoiceT[]> = computed(() =>
    this.invoicesSlice
      .invoices()
      .filter((inv) => this.useFilters.currFilters().includes(inv.status)),
  );

  public readonly cbSave = (data: InvoiceFormT): void => {
    console.log(data);
  };
}

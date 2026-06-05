import { InvoiceT } from '@/common/types/invoices';
import { UseThemeSvc } from '@/core/services/use_theme';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { AddInvoiceMobile } from '../../mobile/add_invoice_mobile/add-invoice-mobile';
import { FilterInvoicesMobile } from '../../mobile/filter_invoices_mobile/filter-invoices-mobile';
import { FilterInvoicesTabletDesktop } from '../filter_invoices_tablet_desktop/filter-invoices-tablet-desktop';
import { AddInvoiceTabletDesktop } from '../add_invoice_tablet_desktop/add-invoice-tablet-desktop';
import { InvoicesSlice } from '@/features/invoices/slice';
import { UseNavSvc } from '@/core/services/use_nav';
import { Breakpoints } from '@/core/constants/break';

@Component({
  selector: 'app-header-home-mobile-tablet-desktop',
  imports: [
    NgClass,
    AddInvoiceMobile,
    AddInvoiceTabletDesktop,
    FilterInvoicesMobile,
    FilterInvoicesTabletDesktop,
  ],
  templateUrl: './header-home-mobile-tablet-desktop.html',
  styleUrl: './header-home-mobile-tablet-desktop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderHomeMobileTabletDesktop {
  public readonly invoicesSlice: InvoicesSlice = inject(InvoicesSlice);

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly toggleInvoiceBar = (): void => {
    if (Breakpoints.isTablet() || Breakpoints.isDesktop()) this.invoicesSlice.toggleInvoiceBar();
    else this.useNav.replace('/invoices-post', { from: null });
  };
}

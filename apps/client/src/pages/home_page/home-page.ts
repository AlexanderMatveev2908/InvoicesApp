import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InvoicesHomeMobileTabletDesktop } from '@/common/components/mixed/invoices_home_mobile_tablet_desktop/invoices-home-mobile-tablet-desktop';
import { NgClass } from '@angular/common';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NoInvoicesMobileTabletDesktop } from '@/common/components/mixed/no_invoices_mobile_tablet_desktop/no-invoices-mobile-tablet-desktop';
import { HeaderHomeMobileTabletDesktop } from '@/common/components/mixed/header_home_mobile_tablet_desktop/header-home-mobile-tablet-desktop';
import { InvoicesSlice } from '@/features/invoices/slice';

@Component({
  selector: 'app-home-page',
  imports: [
    HeaderHomeMobileTabletDesktop,
    InvoicesHomeMobileTabletDesktop,
    NgClass,
    NoInvoicesMobileTabletDesktop,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly invoicesSlice: InvoicesSlice = inject(InvoicesSlice);
}

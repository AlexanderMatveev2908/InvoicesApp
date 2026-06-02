import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InvoicesHomeMobileTabletDesktop } from '@/common/components/mixed/invoices_home_mobile_tablet_desktop/invoices-home-mobile-tablet-desktop';
import { NgClass } from '@angular/common';
import { UseThemeSvc } from '@/core/services/use_theme';
import { InvoiceT } from '@/common/types/invoices';
import { mockInvoices } from '@/mock/data';
import { NoInvoicesMobile } from '@/common/components/mobile/no_invoices_mobile/no-invoices-mobile';
import { HeaderHomeMobileTabletDesktop } from '@/common/components/mixed/header_home_mobile_tablet_desktop/header-home-mobile-tablet-desktop';

@Component({
  selector: 'app-home-page',
  imports: [
    HeaderHomeMobileTabletDesktop,
    InvoicesHomeMobileTabletDesktop,
    NgClass,
    NoInvoicesMobile,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly appMockInvoices: InvoiceT[] = mockInvoices;
}

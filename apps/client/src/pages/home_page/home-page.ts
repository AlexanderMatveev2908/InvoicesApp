import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InvoicesHomeMobile } from '@/common/components/mobile/invoices_home_mobile/invoices-home-mobile';
import { NgClass } from '@angular/common';
import { UseThemeSvc } from '@/core/services/use_theme';
import { InvoiceT } from '@/common/types/invoices';
import { mockInvoices } from '@/mock/data';
import { NoInvoicesMobile } from '@/common/components/mobile/no_invoices_mobile/no-invoices-mobile';
import { HeaderHomeMobileTablet } from '@/common/components/header_home_mobile_tablet/header-home-mobile-tablet';

@Component({
  selector: 'app-home-page',
  imports: [HeaderHomeMobileTablet, InvoicesHomeMobile, NgClass, NoInvoicesMobile],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly appMockInvoices: InvoiceT[] = mockInvoices;
}

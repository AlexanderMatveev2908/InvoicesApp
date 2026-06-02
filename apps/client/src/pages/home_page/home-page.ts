import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderHomeMobile } from '@/common/components/mobile/header_home_mobile/header-home-mobile';
import { InvoicesHomeMobile } from '@/common/components/mobile/invoices_home_mobile/invoices-home-mobile';
import { NgClass } from '@angular/common';
import { UseThemeSvc } from '@/core/services/use_theme';
import { InvoiceT } from '@/common/types/invoices';
import { mockInvoices } from '@/mock/data';
import { NoInvoicesMobile } from '@/common/components/mobile/no_invoices_mobile/no-invoices-mobile';

@Component({
  selector: 'app-home-page',
  imports: [HeaderHomeMobile, InvoicesHomeMobile, NgClass, NoInvoicesMobile],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly appMockInvoices: InvoiceT[] = mockInvoices;
}

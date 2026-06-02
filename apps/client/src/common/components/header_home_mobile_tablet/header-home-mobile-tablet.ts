import { InvoiceT } from '@/common/types/invoices';
import { UseThemeSvc } from '@/core/services/use_theme';
import { mockInvoices } from '@/mock/data';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SvgT } from '@/common/types/general';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { SvgFillArrowDown } from '../svgs/fill/arrow_down/arrow-down';
import { SvgFillPlus } from '../svgs/fill/plus/plus';
import { AddInvoiceMobile } from '../mobile/add_invoice_mobile/add-invoice-mobile';
import { AddInvoiceTablet } from '../tablet/add_invoice_tablet/add-invoice-tablet';

@Component({
  selector: 'app-header-home-mobile-tablet',
  imports: [NgClass, NgComponentOutlet, AddInvoiceMobile, AddInvoiceTablet],
  templateUrl: './header-home-mobile-tablet.html',
  styleUrl: './header-home-mobile-tablet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderHomeMobileTablet {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly appMockInvoices: InvoiceT[] = mockInvoices;

  public readonly SvgArrowDown: SvgT = SvgFillArrowDown;
}

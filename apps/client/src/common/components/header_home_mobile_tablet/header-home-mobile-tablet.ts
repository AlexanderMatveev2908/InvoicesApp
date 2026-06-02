import { InvoiceT } from '@/common/types/invoices';
import { UseThemeSvc } from '@/core/services/use_theme';
import { mockInvoices } from '@/mock/data';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { AddInvoiceMobile } from '../mobile/add_invoice_mobile/add-invoice-mobile';
import { AddInvoiceTablet } from '../tablet/add_invoice_tablet/add-invoice-tablet';
import { FilterInvoicesMobile } from '../mobile/filter_invoices_mobile/filter-invoices-mobile';
import { FilterInvoicesTablet } from '../tablet/filter_invoices_tablet/filter-invoices-tablet';

@Component({
  selector: 'app-header-home-mobile-tablet',
  imports: [
    NgClass,
    AddInvoiceMobile,
    AddInvoiceTablet,
    FilterInvoicesMobile,
    FilterInvoicesTablet,
  ],
  templateUrl: './header-home-mobile-tablet.html',
  styleUrl: './header-home-mobile-tablet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderHomeMobileTablet {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly appMockInvoices: InvoiceT[] = mockInvoices;
}

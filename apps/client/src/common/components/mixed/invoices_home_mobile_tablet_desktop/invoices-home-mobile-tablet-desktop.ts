import { InvoiceT } from '@/common/types/invoices';
import { mockInvoices } from '@/mock/data';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InvoiceElementTabletDesktop } from '../invoice_element_tablet_desktop/invoice-element-tablet-desktop';
import { InvoiceElementMobile } from '../../mobile/invoice_element_mobile/invoice-element-mobile';

@Component({
  selector: 'app-invoices-home-mobile-tablet-desktop',
  imports: [InvoiceElementMobile, InvoiceElementTabletDesktop],
  templateUrl: './invoices-home-mobile-tablet-desktop.html',
  styleUrl: './invoices-home-mobile-tablet-desktop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesHomeMobileTabletDesktop {
  public readonly appMockInvoices: InvoiceT[] = mockInvoices;
}

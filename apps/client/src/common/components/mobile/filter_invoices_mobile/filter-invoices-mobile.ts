import { SvgT } from '@/common/types/general';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UseThemeSvc } from '@/core/services/use_theme';
import { SvgAdvArrowDown } from '../../svgs/advanced/arrow_down/arrow-down';
import { InvoiceStatusT } from '@/common/types/invoices';

@Component({
  selector: 'app-filter-invoices-mobile',
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './filter-invoices-mobile.html',
  styleUrl: './filter-invoices-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterInvoicesMobile {
  public readonly SvgArrowDown: SvgT = SvgAdvArrowDown;
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public readonly options: InvoiceStatusT[] = ['DRAFT', 'PENDING', 'PAID'];
}

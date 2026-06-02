import { SvgT } from '@/common/types/general';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SvgFillArrowDown } from '../../svgs/fill/arrow_down/arrow-down';
import { UseThemeSvc } from '@/core/services/use_theme';

@Component({
  selector: 'app-filter-invoices-mobile',
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './filter-invoices-mobile.html',
  styleUrl: './filter-invoices-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterInvoicesMobile {
  public readonly SvgArrowDown: SvgT = SvgFillArrowDown;
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
}

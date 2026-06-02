import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UseThemeSvc } from '@/core/services/use_theme';
import { SvgT } from '@/common/types/general';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { SvgAdvArrowDown } from '../../svgs/advanced/arrow_down/arrow-down';

@Component({
  selector: 'app-filter-invoices-tablet',
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './filter-invoices-tablet.html',
  styleUrl: './filter-invoices-tablet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterInvoicesTablet {
  public readonly SvgArrowDown: SvgT = SvgAdvArrowDown;
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
}

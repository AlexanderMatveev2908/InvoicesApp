import { InvoiceT } from '@/common/types/invoices';
import { UseThemeSvc } from '@/core/services/use_theme';
import { mockInvoices } from '@/mock/data';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SvgFillArrowDown } from '../../svgs/fill/arrow_down/arrow-down';
import { SvgFillPlus } from '../../svgs/fill/plus/plus';
import { SvgT } from '@/common/types/general';
import { NgClass, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-header-home-mobile',
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './header-home-mobile.html',
  styleUrl: './header-home-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderHomeMobile {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly appMockInvoices: InvoiceT[] = mockInvoices;

  public readonly SvgArrowDown: SvgT = SvgFillArrowDown;
  public readonly SvgPlus: SvgT = SvgFillPlus;
}

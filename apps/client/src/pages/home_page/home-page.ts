import { SvgFillArrowDown } from '@/common/components/svgs/fill/arrow_down/arrow-down';
import { SvgFillPlus } from '@/common/components/svgs/fill/plus/plus';
import { SvgT } from '@/common/types/general';
import { InvoiceT } from '@/common/types/invoices';
import { UseThemeSvc } from '@/core/services/use_theme';
import { mockInvoices } from '@/mock/data';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly mockInvoices: InvoiceT[] = mockInvoices;

  public readonly SvgArrowDown: SvgT = SvgFillArrowDown;
  public readonly SvgPlus: SvgT = SvgFillPlus;
}

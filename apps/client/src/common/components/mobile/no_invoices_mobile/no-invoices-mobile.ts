import { SvgT } from '@/common/types/general';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SvgAdvScreaming } from '../../svgs/advanced/screaming/screaming';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { UseThemeSvc } from '@/core/services/use_theme';

@Component({
  selector: 'app-no-invoices-mobile',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './no-invoices-mobile.html',
  styleUrl: './no-invoices-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoInvoicesMobile {
  public readonly SvgScreaming: SvgT = SvgAdvScreaming;

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
}

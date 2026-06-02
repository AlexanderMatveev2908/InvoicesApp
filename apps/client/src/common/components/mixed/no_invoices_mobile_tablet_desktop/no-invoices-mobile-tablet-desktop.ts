import { SvgT } from '@/common/types/general';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SvgAdvScreaming } from '../../svgs/advanced/screaming/screaming';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { UseThemeSvc } from '@/core/services/use_theme';

@Component({
  selector: 'app-no-invoices-mobile-tablet-desktop',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './no-invoices-mobile-tablet-desktop.html',
  styleUrl: './no-invoices-mobile-tablet-desktop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoInvoicesMobileTabletDesktop {
  public readonly SvgScreaming: SvgT = SvgAdvScreaming;

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
}

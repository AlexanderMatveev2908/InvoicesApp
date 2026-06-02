import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderHomeMobile } from '@/common/components/mobile/header_home_mobile/header-home-mobile';
import { InvoicesHomeMobile } from '@/common/components/mobile/invoices_home_mobile/invoices-home-mobile';
import { NgClass } from '@angular/common';
import { UseThemeSvc } from '@/core/services/use_theme';

@Component({
  selector: 'app-home-page',
  imports: [HeaderHomeMobile, InvoicesHomeMobile, NgClass],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
}

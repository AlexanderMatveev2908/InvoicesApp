import { NgComponentOutlet, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { UseThemeSvc } from '@/core/services/use_theme';
import { SvgT } from '@/common/types/general';
import { SvgAdvLogoApp } from '../svgs/advanced/logo_app/logo-app';
import { SvgFillSun } from '../svgs/fill/sun/sun';
import { SvgFillMoon } from '../svgs/fill/moon/moon';

@Component({
  selector: 'app-navbar-mobile-tablet',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './navbar-mobile-tablet.html',
  styleUrl: './navbar-mobile-tablet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMobileTablet {
  public readonly useThemeSvc: UseThemeSvc = inject(UseThemeSvc);

  public readonly SvgLogo: SvgT = SvgAdvLogoApp;
  public readonly SvgToggle: Signal<SvgT> = computed(() =>
    this.useThemeSvc.isDarkMode() ? SvgFillSun : SvgFillMoon,
  );
}

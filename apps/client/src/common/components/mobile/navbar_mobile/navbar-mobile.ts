import { NgComponentOutlet, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { SvgAdvLogoApp } from '../../svgs/advanced/logo_app/logo-app';
import { SvgT } from '@/common/types/general';
import { SvgFillMoon } from '../../svgs/fill/moon/moon';
import { UseThemeSvc } from '@/core/services/use_theme';
import { SvgFillSun } from '../../svgs/fill/sun/sun';

@Component({
  selector: 'app-navbar-mobile',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './navbar-mobile.html',
  styleUrl: './navbar-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMobile {
  public readonly useThemeSvc: UseThemeSvc = inject(UseThemeSvc);

  public readonly SvgLogo: SvgT = SvgAdvLogoApp;
  public readonly SvgToggle: Signal<SvgT> = computed(() =>
    this.useThemeSvc.isDarkMode() ? SvgFillSun : SvgFillMoon,
  );
}

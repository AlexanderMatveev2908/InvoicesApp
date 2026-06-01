import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { SvgAdvLogoApp } from '../../svgs/advanced/logo_app/logo-app';
import { SvgT } from '@/common/types/general';
import { SvgFillMoon } from '../../svgs/fill/moon/moon';

@Component({
  selector: 'app-navbar-mobile',
  imports: [NgComponentOutlet],
  templateUrl: './navbar-mobile.html',
  styleUrl: './navbar-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMobile {
  public readonly SvgLogo: SvgT = SvgAdvLogoApp;
  public readonly SvgToggle: Signal<SvgT> = computed(() => SvgFillMoon);
}

import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { SvgAdvLogoDesktop } from '../../svgs/advanced/logo_desktop/logo-desktop';
import { SvgT } from '@/common/types/general';
import { SvgFillSun } from '../../svgs/fill/sun/sun';
import { SvgFillMoon } from '../../svgs/fill/moon/moon';

@Component({
  selector: 'app-sidebar-desktop',
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './sidebar-desktop.html',
  styleUrl: './sidebar-desktop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarDesktop {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly SvgLogo: SvgT = SvgAdvLogoDesktop;
  public readonly SvgToggle: Signal<SvgT> = computed(() =>
    this.useTheme.isDarkMode() ? SvgFillSun : SvgFillMoon,
  );
}

import { SvgAdvScreaming } from '@/common/components/svgs/advanced/screaming/screaming';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarMobile } from '@/common/components/mobile/navbar_mobile/navbar-mobile';

@Component({
  selector: 'app-home-page',
  imports: [NavbarMobile],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  public readonly Svg = SvgAdvScreaming;
}

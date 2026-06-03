import { SvgT } from '@/common/types/general';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgAdvArrowLeft } from '../../svgs/advanced/arrow_left/arrow-left';

@Component({
  selector: 'app-go-back-mobile',
  imports: [RouterLink, NgClass, NgComponentOutlet],
  templateUrl: './go-back-mobile.html',
  styleUrl: './go-back-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoBackMobile {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public readonly SvgArrow: SvgT = SvgAdvArrowLeft;
}

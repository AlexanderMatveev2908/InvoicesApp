import { SvgAdvScreaming } from '@/common/components/svgs/advanced/screaming/screaming';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  public readonly Svg = SvgAdvScreaming;
}

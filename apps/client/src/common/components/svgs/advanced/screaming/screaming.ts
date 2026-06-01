import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-advanced-screaming',
  templateUrl: `./screaming.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgAdvScreaming {
  width: InputSignal<'auto' | string> = input('100%');
  height: InputSignal<'auto' | string> = input('100%');
}

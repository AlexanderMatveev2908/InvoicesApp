

import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-advanced-arrow-down',
  templateUrl: `./arrow-down.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgAdvArrowDown {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
}

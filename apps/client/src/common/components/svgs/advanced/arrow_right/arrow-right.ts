

import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-advanced-arrow-right',
  templateUrl: `./arrow-right.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgAdvArrowRight {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
}

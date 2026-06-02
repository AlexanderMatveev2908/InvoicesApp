

import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-advanced-arrow-left',
  templateUrl: `./arrow-left.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgAdvArrowLeft {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
}

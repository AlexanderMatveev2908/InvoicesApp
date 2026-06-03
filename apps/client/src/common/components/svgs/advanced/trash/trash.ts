

import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-advanced-trash',
  templateUrl: `./trash.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgAdvTrash {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
}

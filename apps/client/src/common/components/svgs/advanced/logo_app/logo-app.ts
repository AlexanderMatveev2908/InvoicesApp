

import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-advanced-logo-app',
  templateUrl: `./logo-app.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgAdvLogoApp {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
}



import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-advanced-logo-desktop',
  templateUrl: `./logo-desktop.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgAdvLogoDesktop {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
}

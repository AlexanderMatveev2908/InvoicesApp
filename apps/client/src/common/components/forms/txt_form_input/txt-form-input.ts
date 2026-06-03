import { TxtInputFormT } from '@/common/types/dom';
import { Nullable } from '@/common/types/general';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormControlStatus, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-txt-form-input',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './txt-form-input.html',
  styleUrl: './txt-form-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TxtFormInput extends UseInjCtxHk implements OnInit {
  public readonly txtInput: InputSignal<TxtInputFormT> = input.required();
  public readonly ctrl: InputSignal<FormControl> = input.required();

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public val: Nullable<Signal<Nullable<string>>> = null;

  ngOnInit(): void {
    this.usePlatform.inGlobalCtx(() => {
      const ctrl: FormControl = this.ctrl();

      this.val = toSignal(ctrl.valueChanges, {
        initialValue: ctrl.value,
      });
    });

    this.useEffect(() => {
      const value = this.val?.();

      console.log(value);
      console.log(this.ctrl().errors);
    });
  }
}

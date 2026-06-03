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
  public touched: Nullable<Signal<boolean>> = null;

  public readonly errMsg: WritableSignal<Nullable<string>> = signal(null);

  ngOnInit(): void {
    this.usePlatform.inGlobalCtx(() => {
      const c: FormControl = this.ctrl();

      this.val = toSignal(c.valueChanges, {
        initialValue: c.value,
      });

      this.touched = toSignal(
        c.statusChanges.pipe(map((_: FormControlStatus) => c.touched || c.dirty)),
        {
          initialValue: c.touched || c.dirty,
        },
      );
    });

    this.useEffect(() => {
      void this.val?.();
      void this.touched?.();

      this.errMsg.set(this.ctrl().errors?.['zod']);
    });
  }
}

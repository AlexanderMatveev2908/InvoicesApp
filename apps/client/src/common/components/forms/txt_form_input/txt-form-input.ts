import { TxtInputFormT } from '@/common/types/dom';
import { Nullable } from '@/common/types/general';
import { UseFormFieldDir } from '@/core/directives/use_form_field_dir';
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
export class TxtFormInput extends UseFormFieldDir implements OnInit {
  public readonly txtInput: InputSignal<TxtInputFormT> = input.required();

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  ngOnInit(): void {
    this.setupField();
  }
}

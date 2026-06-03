import { TxtInputFormT } from '@/common/types/dom';
import { UseFormFieldDir } from '@/core/directives/use_form_field_dir';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-txt-form-field-array-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './txt-form-field-array-input.html',
  styleUrl: './txt-form-field-array-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TxtFormFieldArrayInput {
  public readonly txtInput: InputSignal<TxtInputFormT> = input.required();

  public readonly ctrl: InputSignal<FormControl> = input.required();

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
}

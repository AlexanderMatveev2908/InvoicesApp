import { UseFormFieldDir } from '@/core/directives/use_form_field_dir';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice-date-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './invoice-date-input.html',
  styleUrl: './invoice-date-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceDateInput extends UseFormFieldDir implements OnInit {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  ngOnInit(): void {
    this.setupField();
  }
}

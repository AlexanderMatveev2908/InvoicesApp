import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { BgBlack } from '@/layout/bg_black/bg-black';
import { InvoicesSlice } from '../../slice';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InvoiceFormMng } from '../../paperwork/InvoiceFormMng';
import { InvoicesUiFct } from '../../ui_factory';
import { TxtFormInput } from '@/common/components/forms/txt_form_input/txt-form-input';

@Component({
  selector: 'app-invoices-form-tablet-desktop',
  imports: [BgBlack, NgClass, ReactiveFormsModule, TxtFormInput],
  templateUrl: './invoices-form-tablet-desktop.html',
  styleUrl: './invoices-form-tablet-desktop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesFormTabletDesktop {
  public readonly invoicesSlice: InvoicesSlice = inject(InvoicesSlice);

  public readonly isBlack: Signal<boolean> = computed(
    () => this.invoicesSlice.invoicesState().invoiceBar,
  );

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly InvoicesUiFct = InvoicesUiFct;

  public readonly form: FormGroup = InvoiceFormMng.form();

  public getCtrl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  public getItemCtrl(index: number, key: 'name' | 'qty' | 'price'): FormControl {
    return this.form.get(`itemsList.${index}.${key}`) as FormControl;
  }
}

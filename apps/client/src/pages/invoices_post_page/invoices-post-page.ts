import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GoBackMobile } from '@/common/components/mobile/go_back_mobile/go-back-mobile';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { InvoiceFormMng } from '@/features/invoices/paperwork/InvoiceFormMng';
import { ReactiveFormsModule } from '@angular/forms';
import { LibLog } from '@/core/lib/log';

@Component({
  selector: 'app-invoices-post-page',
  imports: [GoBackMobile, NgClass, ReactiveFormsModule],
  templateUrl: './invoices-post-page.html',
  styleUrl: './invoices-post-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesPostPage {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public readonly form: FormGroup = InvoiceFormMng.form;

  public getCtrl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  public readonly submit = (): void => {
    const data = this.form.getRawValue();
    const res = InvoiceFormMng.schema.safeParse(data);

    if (!res.success) {
      LibLog.main('form error', res.error.issues);
      this.form.markAllAsTouched();
      return;
    }

    LibLog.main('form ok', res.data);
  };
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { GoBackMobile } from '@/common/components/mobile/go_back_mobile/go-back-mobile';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { InvoiceFormMng, InvoiceFormT } from '@/features/invoices/paperwork/InvoiceFormMng';
import { ReactiveFormsModule } from '@angular/forms';
import { LibLog } from '@/core/lib/log';
import { TxtFormInput } from '@/common/components/forms/txt_form_input/txt-form-input';
import { TxtInputFormT } from '@/common/types/dom';
import { InvoicesUiFct } from '@/features/invoices/ui_factory';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibRootForm } from '@/core/lib/forms/root_form';

@Component({
  selector: 'app-invoices-post-page',
  imports: [GoBackMobile, NgClass, ReactiveFormsModule, TxtFormInput],
  templateUrl: './invoices-post-page.html',
  styleUrl: './invoices-post-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesPostPage extends UseInjCtxHk implements OnInit {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public readonly form: FormGroup = InvoiceFormMng.form;

  public getCtrl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  public readonly billFromStreet: TxtInputFormT = InvoicesUiFct.billFromStreet;

  public readonly data = toSignal(this.form.valueChanges.pipe(startWith(this.form.getRawValue())), {
    initialValue: this.form.getRawValue(),
  });

  public readonly submit = (): void => {
    LibRootForm.handleSubmit({
      form: this.form,
      schema: InvoiceFormMng.schema,
      onValid: (data) => LibLog.main('success', data),
      onInvalid: (issues) => LibLog.main('invalid', issues),
    });
  };

  ngOnInit(): void {
    this.useEffect(() => {
      LibRootForm.setupIssues({
        data: this.data(),
        form: this.form,
        schema: InvoiceFormMng.schema,
      });
    });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  WritableSignal,
} from '@angular/core';
import { GoBackMobile } from '@/common/components/mobile/go_back_mobile/go-back-mobile';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  InvoiceFormItemT,
  InvoiceFormMng,
  InvoiceFormT,
} from '@/features/invoices/paperwork/InvoiceFormMng';
import { ReactiveFormsModule } from '@angular/forms';
import { LibLog } from '@/core/lib/log';
import { TxtFormInput } from '@/common/components/forms/txt_form_input/txt-form-input';
import { TxtInputFormT } from '@/common/types/dom';
import { InvoicesUiFct } from '@/features/invoices/ui_factory';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibRootForm } from '@/core/lib/forms/root_form';
import { InvoiceDateInput } from '@/common/components/forms/invoice_date_input/invoice-date-input';
import { PaymentTermInput } from '@/common/components/forms/payment_term_input/payment-term-input';
import { LibFormat } from '@/core/lib/data_structures/format';
import { SvgT } from '@/common/types/general';
import { SvgAdvTrash } from '@/common/components/svgs/advanced/trash/trash';

@Component({
  selector: 'app-invoices-post-page',
  imports: [
    GoBackMobile,
    NgClass,
    ReactiveFormsModule,
    TxtFormInput,
    InvoiceDateInput,
    PaymentTermInput,
    NgComponentOutlet,
  ],
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

  public getItemCtrl(index: number, key: 'name' | 'qty' | 'price'): FormControl {
    return this.form.get(`itemsList.${index}.${key}`) as FormControl;
  }

  public readonly SvgTrash: SvgT = SvgAdvTrash;

  public readonly billFromStreet: TxtInputFormT = InvoicesUiFct.billFromStreet;
  public readonly billFromCity: TxtInputFormT = InvoicesUiFct.billFromCity;
  public readonly billFromZip: TxtInputFormT = InvoicesUiFct.billFromZip;
  public readonly billFromCountry: TxtInputFormT = InvoicesUiFct.billFromCountry;
  public readonly billToClientName: TxtInputFormT = InvoicesUiFct.billToClientName;
  public readonly billToClientMail: TxtInputFormT = InvoicesUiFct.billToClientMail;
  public readonly billToStreet: TxtInputFormT = InvoicesUiFct.billToStreet;
  public readonly billToCity: TxtInputFormT = InvoicesUiFct.billToCity;
  public readonly billToZip: TxtInputFormT = InvoicesUiFct.billToZip;
  public readonly billToCountry: TxtInputFormT = InvoicesUiFct.billToCountry;
  public readonly invoiceDate: TxtInputFormT = InvoicesUiFct.invoiceDate;
  public readonly paymentTerm: TxtInputFormT = InvoicesUiFct.paymentTerm;

  public readonly itemName: TxtInputFormT = InvoicesUiFct.itemName;
  public readonly itemQty: TxtInputFormT = InvoicesUiFct.itemQty;
  public readonly itemPrice: TxtInputFormT = InvoicesUiFct.itemPrice;

  public readonly data = toSignal(this.form.valueChanges.pipe(startWith(this.form.getRawValue())), {
    initialValue: this.form.getRawValue(),
  });

  public readonly itemsList: Signal<InvoiceFormItemT[]> = computed(
    () => this.data().itemsList ?? [],
  );

  public calcTot(option: InvoiceFormItemT): string {
    const tot: unknown = +option.price * +option.qty;

    return Number.isFinite(tot) ? LibFormat.formatMoney(tot as number) : 'Unavailable';
  }

  public addItemToList(): void {
    (this.form.controls['itemsList'] as FormArray).push(
      new FormGroup({
        name: new FormControl('', {
          nonNullable: true,
        }),
        qty: new FormControl(1, {
          nonNullable: true,
        }),
        price: new FormControl('', {
          nonNullable: true,
        }),
      }),
    );
  }

  public removeItemFromList(index: number): void {
    (this.form.controls['itemsList'] as FormArray).removeAt(index);
  }

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

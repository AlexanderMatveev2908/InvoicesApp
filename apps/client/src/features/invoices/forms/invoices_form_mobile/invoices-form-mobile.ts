import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { TxtFormInput } from '@/common/components/forms/txt_form_input/txt-form-input';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TxtInputFormT } from '@/common/types/dom';
import { InvoicesUiFct } from '../../ui_factory';
import { InvoiceFormItemT, InvoiceFormMng, InvoiceFormT } from '../../paperwork/InvoiceFormMng';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { InvoiceDateInput } from '@/common/components/forms/invoice_date_input/invoice-date-input';
import { PaymentTermInput } from '@/common/components/forms/payment_term_input/payment-term-input';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { UseThemeSvc } from '@/core/services/use_theme';
import { LibRootForm } from '@/core/lib/forms/root_form';
import { LibLog } from '@/core/lib/log';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibFormat } from '@/core/lib/data_structures/format';
import { Optional, SvgT } from '@/common/types/general';
import { SvgAdvTrash } from '@/common/components/svgs/advanced/trash/trash';
import { InvoiceT } from '@/common/types/invoices';
import { FooterPostInvoiceMobile } from './components/footer_post_invoice_mobile/footer-post-invoice-mobile';
import { FooterPutInvoiceMobile } from './components/footer_put_invoice_mobile/footer-put-invoice-mobile';

@Component({
  selector: 'app-invoices-form-mobile',
  imports: [
    TxtFormInput,
    NgClass,
    ReactiveFormsModule,
    InvoiceDateInput,
    PaymentTermInput,
    NgComponentOutlet,
    FooterPostInvoiceMobile,
    FooterPutInvoiceMobile,
  ],
  templateUrl: './invoices-form-mobile.html',
  styleUrl: './invoices-form-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesFormMobile extends UseInjCtxHk implements OnInit {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public readonly currInvoice: InputSignal<Optional<InvoiceT>> = input();
  public readonly isPendingSave: InputSignal<boolean> = input.required();
  public readonly isPendingDraft: InputSignal<Optional<boolean>> = input();
  public readonly cbSave: InputSignal<(data: InvoiceFormT) => void> = input.required();
  public readonly cbDraft: InputSignal<Optional<(data: InvoiceFormT) => void>> =
    input<(data: InvoiceFormT) => void>();

  public readonly SvgTrash: SvgT = SvgAdvTrash;

  public readonly form: FormGroup = InvoiceFormMng.form();

  public getCtrl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  public getItemCtrl(index: number, key: 'name' | 'qty' | 'price'): FormControl {
    return this.form.get(`itemsList.${index}.${key}`) as FormControl;
  }

  public readonly action: WritableSignal<string> = signal('draft');

  public readonly setAction = (status: string) => {
    this.action.set(status);
  };

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
  public readonly description: TxtInputFormT = InvoicesUiFct.description;

  public readonly itemName: TxtInputFormT = InvoicesUiFct.itemName;
  public readonly itemQty: TxtInputFormT = InvoicesUiFct.itemQty;
  public readonly itemPrice: TxtInputFormT = InvoicesUiFct.itemPrice;

  public readonly data = toSignal(this.form.valueChanges.pipe(startWith(this.form.getRawValue())), {
    initialValue: this.form.getRawValue(),
  });

  public readonly itemsList: Signal<InvoiceFormItemT[]> = computed(
    () => this.data().itemsList ?? [],
  );

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

  public calcTot(option: InvoiceFormItemT): string {
    const tot: unknown = +option.price * +option.qty;

    return Number.isFinite(tot) ? LibFormat.formatMoney(tot as number) : 'Unavailable';
  }

  public readonly submit = (): void => {
    LibRootForm.handleSubmit({
      form: this.form,
      schema: InvoiceFormMng.schema,
      onValid: (data) =>
        this.action() === 'pending' ? this.cbSave()(data) : this.cbDraft()?.(data),
      onInvalid: (issues) => LibLog.main('invalid', issues),
    });
  };

  public readonly resetForm = (): void => {
    this.form.reset();
  };

  public readonly resetFormDefault = (): void => {
    this.applyCurrInvoiceData();
  };

  public readonly applyCurrInvoiceData = (): void => {
    this.form.markAllAsDirty();
    this.form.markAllAsTouched();

    const inv: InvoiceT = this.currInvoice() as InvoiceT;

    this.form.patchValue({
      billFromStreet: inv.billFromStreet,
      billFromCity: inv.billFromCity,
      billFromZip: inv.billFromZip,
      billFromCountry: inv.billFromCountry,

      billToClientName: inv.billToClientName,
      billToClientMail: inv.billToClientMail,
      billToStreet: inv.billToStreet,
      billToCity: inv.billToCity,
      billToZip: inv.billToZip,
      billToCountry: inv.billToCountry,

      invoiceDate: inv.invoiceDate,
      paymentTerm: inv.paymentTerm,
    });

    (this.form.controls['itemsList'] as FormArray).clear();

    for (const item of inv.items) {
      (this.form.controls['itemsList'] as FormArray).push(
        new FormGroup({
          name: new FormControl(item.name, { nonNullable: true }),
          qty: new FormControl(item.qty + '', { nonNullable: true }),
          price: new FormControl(item.price + '', { nonNullable: true }),
        }),
      );
    }
  };

  ngOnInit(): void {
    this.useEffect(() => {
      LibRootForm.setupIssues({
        data: this.data(),
        form: this.form,
        schema: InvoiceFormMng.schema,
      });
    });

    if (!this.currInvoice()) return;

    this.applyCurrInvoiceData();
  }
}

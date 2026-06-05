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
import { BgBlack } from '@/layout/bg_black/bg-black';
import { InvoicesSlice } from '../../slice';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InvoiceFormItemT, InvoiceFormMng, InvoiceFormT } from '../../paperwork/InvoiceFormMng';
import { InvoicesUiFct } from '../../ui_factory';
import { TxtFormInput } from '@/common/components/forms/txt_form_input/txt-form-input';
import { InvoiceT } from '@/common/types/invoices';
import { Optional, SvgT } from '@/common/types/general';
import { PaymentTermInput } from '@/common/components/forms/payment_term_input/payment-term-input';
import { InvoiceDateInput } from '@/common/components/forms/invoice_date_input/invoice-date-input';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { LibRootForm } from '@/core/lib/forms/root_form';
import { LibFormat } from '@/core/lib/data_structures/format';
import { LibLog } from '@/core/lib/log';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { SvgAdvTrash } from '@/common/components/svgs/advanced/trash/trash';
import { FooterPostInvoiceMobile } from '../invoices_form_mobile/components/footer_post_invoice_mobile/footer-post-invoice-mobile';

@Component({
  selector: 'app-invoices-form-tablet-desktop',
  imports: [
    BgBlack,
    NgClass,
    ReactiveFormsModule,
    TxtFormInput,
    PaymentTermInput,
    InvoiceDateInput,
    NgComponentOutlet,
    FooterPostInvoiceMobile,
  ],
  templateUrl: './invoices-form-tablet-desktop.html',
  styleUrl: './invoices-form-tablet-desktop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesFormTabletDesktop extends UseInjCtxHk implements OnInit {
  public readonly invoicesSlice: InvoicesSlice = inject(InvoicesSlice);

  public readonly currInvoice: InputSignal<Optional<InvoiceT>> = input();
  public readonly isPendingSave: InputSignal<boolean> = input.required();
  public readonly isPendingDraft: InputSignal<Optional<boolean>> = input();
  public readonly cbSave: InputSignal<(data: InvoiceFormT) => void> = input.required();
  public readonly cbDraft: InputSignal<Optional<(data: InvoiceFormT) => void>> =
    input<(data: InvoiceFormT) => void>();

  public readonly action: WritableSignal<string> = signal('draft');

  public readonly setAction = (status: string) => {
    this.action.set(status);
  };

  public readonly isBlack: Signal<boolean> = computed(
    () => this.invoicesSlice.invoicesState().invoiceBar,
  );

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
  public readonly InvoicesUiFct = InvoicesUiFct;

  public readonly SvgTrash: SvgT = SvgAdvTrash;

  public readonly form: FormGroup = InvoiceFormMng.form();

  public readonly data = toSignal(this.form.valueChanges.pipe(startWith(this.form.getRawValue())), {
    initialValue: this.form.getRawValue(),
  });

  public readonly itemsList: Signal<InvoiceFormItemT[]> = computed(
    () => this.data().itemsList ?? [],
  );

  public getCtrl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  public getItemCtrl(index: number, key: 'name' | 'qty' | 'price'): FormControl {
    return this.form.get(`itemsList.${index}.${key}`) as FormControl;
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

      description: inv.description,
      invoiceDate: new Date(inv.invoiceDate).toISOString().split('T')[0],
      paymentTerm: inv.paymentTerm,
    });

    (this.form.controls['itemsList'] as FormArray).clear();

    for (const item of inv.itemsList) {
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

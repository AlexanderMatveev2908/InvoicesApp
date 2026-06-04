import { Optional } from '@/common/types/general';
import { UseThemeSvc } from '@/core/services/use_theme';
import { InvoiceFormT } from '@/features/invoices/paperwork/InvoiceFormMng';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-footer-post-invoice-mobile',
  imports: [NgClass],
  templateUrl: './footer-post-invoice-mobile.html',
  styleUrl: './footer-post-invoice-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterPostInvoiceMobile {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public readonly setAction: InputSignal<(status: string) => void> = input.required();

  public readonly isPendingSave: InputSignal<boolean> = input.required();
  public readonly isPendingDraft: InputSignal<Optional<boolean>> = input();

  public readonly resetForm: InputSignal<() => void> = input.required();
}

import { InvoiceT } from '@/common/types/invoices';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-invoice-element-tablet-desktop',
  imports: [NgClass],
  templateUrl: './invoice-element-tablet-desktop.html',
  styleUrl: './invoice-element-tablet-desktop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceElementTabletDesktop {
  public readonly inv: InputSignal<InvoiceT> = input.required();

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
}

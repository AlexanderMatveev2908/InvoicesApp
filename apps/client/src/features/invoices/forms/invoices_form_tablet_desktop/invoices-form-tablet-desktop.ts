import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { BgBlack } from '@/layout/bg_black/bg-black';
import { InvoicesSlice } from '../../slice';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-invoices-form-tablet-desktop',
  imports: [BgBlack, NgClass],
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
}

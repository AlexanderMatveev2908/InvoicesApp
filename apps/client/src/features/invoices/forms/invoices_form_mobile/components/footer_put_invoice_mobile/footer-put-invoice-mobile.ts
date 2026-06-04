import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-footer-put-invoice-mobile',
  imports: [NgClass],
  templateUrl: './footer-put-invoice-mobile.html',
  styleUrl: './footer-put-invoice-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterPutInvoiceMobile {
  public readonly resetFormDefault: InputSignal<() => void> = input.required();

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
}

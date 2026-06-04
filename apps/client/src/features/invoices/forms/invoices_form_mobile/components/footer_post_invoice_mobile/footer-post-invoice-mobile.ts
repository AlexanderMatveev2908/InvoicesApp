import { UseThemeSvc } from '@/core/services/use_theme';
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

  public readonly resetForm: InputSignal<() => void> = input.required();
}

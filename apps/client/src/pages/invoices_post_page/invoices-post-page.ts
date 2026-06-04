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
import { InvoicesFormMobile } from '@/features/invoices/forms/invoices_form_mobile/invoices-form-mobile';

@Component({
  selector: 'app-invoices-post-page',
  imports: [GoBackMobile, NgClass, InvoicesFormMobile],
  templateUrl: './invoices-post-page.html',
  styleUrl: './invoices-post-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesPostPage {
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);
}

import { UseFormFieldDir } from '@/core/directives/use_form_field_dir';
import { UseThemeSvc } from '@/core/services/use_theme';
import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SvgAdvArrowDown } from '../../svgs/advanced/arrow_down/arrow-down';
import { SvgT, WithIdT } from '@/common/types/general';
import { PaymentTermT } from '@/common/types/invoices';
import { v4 } from 'uuid';

@Component({
  selector: 'app-payment-term-input',
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './payment-term-input.html',
  styleUrl: './payment-term-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentTermInput extends UseFormFieldDir implements OnInit {
  public readonly isVisible: WritableSignal<boolean> = signal(false);

  public toggle(): void {
    this.isVisible.set(!this.isVisible());
  }

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public readonly SvgArrow: SvgT = SvgAdvArrowDown;

  public readonly options: WithIdT<{ val: PaymentTermT }>[] = [
    'Net 1 Day',
    'Net 7 Days',
    'Net 14 Days',
    'Net 30 Days',
  ].map((el) => ({
    val: el as PaymentTermT,
    id: v4(),
  }));

  public handleChange(val: PaymentTermT): void {
    this.ctrl().markAsTouched();
    this.ctrl().markAsDirty();
    this.ctrl().setValue(val);

    this.toggle();
  }

  ngOnInit(): void {
    this.setupField();
  }
}

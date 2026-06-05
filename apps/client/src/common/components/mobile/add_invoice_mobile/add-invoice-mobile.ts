import { SvgT } from '@/common/types/general';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { SvgFillPlus } from '../../svgs/fill/plus/plus';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-invoice-mobile',
  imports: [NgComponentOutlet],
  templateUrl: './add-invoice-mobile.html',
  styleUrl: './add-invoice-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddInvoiceMobile {
  public readonly SvgPlus: SvgT = SvgFillPlus;

  public readonly toggleInvoiceBar: InputSignal<() => void> = input.required();
}

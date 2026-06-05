import { SvgT } from '@/common/types/general';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { SvgFillPlus } from '../../svgs/fill/plus/plus';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-invoice-tablet-desktop',
  imports: [NgComponentOutlet],
  templateUrl: './add-invoice-tablet-desktop.html',
  styleUrl: './add-invoice-tablet-desktop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddInvoiceTabletDesktop {
  public readonly SvgPlus: SvgT = SvgFillPlus;

  public readonly toggleInvoiceBar: InputSignal<() => void> = input.required();
}

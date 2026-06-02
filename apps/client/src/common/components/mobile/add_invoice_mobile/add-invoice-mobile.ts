import { SvgT } from '@/common/types/general';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgFillPlus } from '../../svgs/fill/plus/plus';

@Component({
  selector: 'app-add-invoice-mobile',
  imports: [NgComponentOutlet],
  templateUrl: './add-invoice-mobile.html',
  styleUrl: './add-invoice-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddInvoiceMobile {
  public readonly SvgPlus: SvgT = SvgFillPlus;
}

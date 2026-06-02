import { SvgT } from '@/common/types/general';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgFillPlus } from '../../svgs/fill/plus/plus';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-add-invoice-tablet',
  imports: [NgComponentOutlet],
  templateUrl: './add-invoice-tablet.html',
  styleUrl: './add-invoice-tablet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddInvoiceTablet {
  public readonly SvgPlus: SvgT = SvgFillPlus;
}

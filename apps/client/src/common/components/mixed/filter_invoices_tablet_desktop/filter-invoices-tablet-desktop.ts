import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { UseThemeSvc } from '@/core/services/use_theme';
import { SvgT } from '@/common/types/general';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { SvgAdvArrowDown } from '../../svgs/advanced/arrow_down/arrow-down';
import { InvoiceStatusT } from '@/common/types/invoices';
import { UseFiltersInvoicesSvc } from '@/core/services/use_filters_invoices';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

@Component({
  selector: 'app-filter-invoices-tablet-desktop',
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './filter-invoices-tablet-desktop.html',
  styleUrl: './filter-invoices-tablet-desktop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterInvoicesTabletDesktop extends UseInjCtxHk implements OnInit {
  public readonly SvgArrowDown: SvgT = SvgAdvArrowDown;
  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public readonly useFilters: UseFiltersInvoicesSvc = inject(UseFiltersInvoicesSvc);

  public readonly isDrop: WritableSignal<boolean> = signal(false);

  public readonly options: InvoiceStatusT[] = ['DRAFT', 'PENDING', 'PAID'];

  public toggleDrop(): void {
    this.isDrop.set(!this.isDrop());
  }

  ngOnInit(): void {
    this.useEffect(() => {
      console.log(this.isDrop());
    });
  }
}

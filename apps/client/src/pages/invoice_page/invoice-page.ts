import { SvgAdvArrowLeft } from '@/common/components/svgs/advanced/arrow_left/arrow-left';
import { Optional, SvgT } from '@/common/types/general';
import { InvoiceT } from '@/common/types/invoices';
import { UseMetaStatusDir } from '@/core/directives/use_meta_status_dir';
import { LibFormat } from '@/core/lib/data_structures/format';
import { LibLog } from '@/core/lib/log';
import { UseNavSvc } from '@/core/services/use_nav';
import { mockInvoices } from '@/mock/data';
import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-page',
  imports: [RouterLink, NgComponentOutlet, NgClass],
  templateUrl: './invoice-page.html',
  styleUrl: './invoice-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePage extends UseMetaStatusDir implements OnInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly SvgArrow: SvgT = SvgAdvArrowLeft;

  public readonly currInvoice: Signal<Optional<InvoiceT>> = computed(() =>
    mockInvoices.find((el: InvoiceT) => el.id === this.useNav.pathVariables()?.['invoiceID']),
  );

  public formatDate(): string {
    return LibFormat.formatDate(this.currInvoice()?.date!);
  }

  ngOnInit(): void {
    LibLog.main('invoice page', this.getTxtClrByStatus(this.currInvoice()?.status!));
  }
}

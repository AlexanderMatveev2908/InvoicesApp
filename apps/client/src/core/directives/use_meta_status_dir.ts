import { Directive, inject, Injectable } from '@angular/core';
import { LibMetaStatusInvoice } from '../lib/meta_status_invoice';
import { InvoiceStatusT } from '@/common/types/invoices';
import { UseThemeSvc } from '../services/use_theme';

@Directive()
export class UseMetaStatusDir {
  protected readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public getBgByStatus(status: InvoiceStatusT): string {
    return LibMetaStatusInvoice.bgByStatusWithDark(status, this.useTheme.isDarkMode());
  }

  public getTxtClrByStatus(status: InvoiceStatusT): string {
    return LibMetaStatusInvoice.txtByStatusWithDark(status, this.useTheme.isDarkMode());
  }
}

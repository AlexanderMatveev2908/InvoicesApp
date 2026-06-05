import { InvoiceT } from '@/common/types/invoices';
import { createAction, props } from '@ngrx/store';

export const InvoicesActT = {
  RESET__INVOICES_STATE: createAction('RESET__INVOICES_STATE'),
  SET_INVOICES: createAction('SET_INVOICES', props<{ invoices: InvoiceT[] }>()),
  REFRESH_KEY: createAction('REFRESH_KEY'),
  SET_INVOICE_BAR: createAction('SET_INVOICE_BAR', props<{ val: boolean }>()),
};

import { InvoiceStatusT, InvoiceT } from '@/common/types/invoices';
import { createReducer, on } from '@ngrx/store';
import { InvoicesActT } from './actions';

export interface InvoicesStateT {
  invoices: InvoiceT[];
  refreshKey: number;
  invoiceBar: boolean;
}

const initState: InvoicesStateT = {
  invoices: [],
  refreshKey: 0,
  invoiceBar: false,
};

export const invoicesReducer = createReducer(
  initState,
  on(InvoicesActT.RESET__INVOICES_STATE, () => initState),
  on(InvoicesActT.SET_INVOICES, (_: InvoicesStateT, action: { invoices: InvoiceT[] }) => ({
    ..._,
    invoices: action.invoices,
  })),
  on(InvoicesActT.REFRESH_KEY, (state: InvoicesStateT) => ({
    ...state,
    refreshKey: state.refreshKey + 1,
  })),
  on(InvoicesActT.SET_INVOICE_BAR, (_: InvoicesStateT, action: { val: boolean }) => ({
    ..._,
    invoiceBar: action.val,
  })),
);

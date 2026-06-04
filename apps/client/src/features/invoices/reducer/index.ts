import { InvoiceT } from '@/common/types/invoices';
import { createReducer, on } from '@ngrx/store';
import { InvoicesActT } from './actions';

export interface InvoicesStateT {
  invoices: InvoiceT[];
  refreshKey: number;
}

const initState: InvoicesStateT = {
  invoices: [],
  refreshKey: 0,
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
);

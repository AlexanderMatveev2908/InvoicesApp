import { createFeatureSelector } from '@ngrx/store';
import { InvoicesStateT } from '.';

export const getInvoicesState = createFeatureSelector<InvoicesStateT>('invoices');

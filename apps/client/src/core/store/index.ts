import { invoicesReducer, InvoicesStateT } from '@/features/invoices/reducer';
import { noticeReducer, NoticeStateT } from '@/features/notice/reducer';
import { themeReducer, ThemeStateT } from '@/features/theme/reducer';
import { toastReducer, ToastStateT } from '@/features/toast/reducer';
import { wakeUpReducer, WakeUpStateT } from '@/features/wake_up/reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface StoreStateT {
  toast: ToastStateT;
  notice: NoticeStateT;
  wakeUp: WakeUpStateT;
  theme: ThemeStateT;
  invoices: InvoicesStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  toast: toastReducer,
  notice: noticeReducer,
  wakeUp: wakeUpReducer,
  theme: themeReducer,
  invoices: invoicesReducer,
};

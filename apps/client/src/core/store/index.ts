import { ActionReducerMap } from '@ngrx/store';
import { noticeReducer, NoticeStateT } from '../../features/notice/reducer';
import { wakeUpReducer, WakeUpStateT } from '../../features/wakeup/reducer';
import { toastReducer, ToastStateT } from '../../features/toast/reducer/reducer';

export interface StoreStateT {
  notice: NoticeStateT;
  wakeUp: WakeUpStateT;
  toast: ToastStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  notice: noticeReducer,
  wakeUp: wakeUpReducer,
  toast: toastReducer,
};

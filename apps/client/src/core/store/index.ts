import { ActionReducerMap } from '@ngrx/store';
import { noticeReducer, NoticeStateT } from '../../features/notice/reducer';
import { wakeUpReducer, WakeUpStateT } from '../../features/wakeup/reducer';

export interface StoreStateT {
  notice: NoticeStateT;
  wakeUp: WakeUpStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  notice: noticeReducer,
  wakeUp: wakeUpReducer,
};

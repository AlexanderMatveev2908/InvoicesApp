import { ActionReducerMap } from '@ngrx/store';
import { noticeReducer, NoticeStateT } from '../../features/notice/reducer/reducer';

export interface StoreStateT {
  notice: NoticeStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  notice: noticeReducer,
};

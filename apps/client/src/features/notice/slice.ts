import { Injectable, Signal } from '@angular/core';
import { UseKitSliceSvc } from '../../core/services/use_kit_slice';
import { NoticeStateT } from './reducer';
import { getNoticeState } from './reducer/selectors';
import { NoticeActT } from './reducer/actions';

@Injectable({
  providedIn: 'root',
})
export class NoticeSlice extends UseKitSliceSvc {
  public get noticeState(): Signal<NoticeStateT> {
    return this.store.selectSignal(getNoticeState);
  }

  private set noticeState(arg: NoticeStateT) {
    this.store.dispatch(NoticeActT.SET_NOTICE({ ...arg }));
    const { cb, ...rst } = arg;

    this.useStorage.setItem('notice', rst);
  }

  public setNotice(arg: NoticeStateT) {
    this.noticeState = arg;
  }
}

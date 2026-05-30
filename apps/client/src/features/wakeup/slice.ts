import { computed, Injectable, Signal } from '@angular/core';
import { UseKitSliceSvc } from '../../core/services/use_kit_slice';
import { WakeUpStateT } from './reducer';
import { getWakeUpState } from './reducer/selectors';
import { WakeUpActT } from './reducer/actions';

@Injectable({
  providedIn: 'root',
})
export class WakeUpSlice extends UseKitSliceSvc {
  public get wakeUpState(): Signal<WakeUpStateT> {
    return this.store.selectSignal(getWakeUpState);
  }

  public readonly isAwake: Signal<boolean> = computed(() => this.wakeUpState().isAwake);

  public reset(): void {
    this.store.dispatch(WakeUpActT.RESET__WAKE_UP_STATE());
  }

  public setAwake(val: boolean): void {
    this.store.dispatch(WakeUpActT.SET_WAKE_UP_STATE({ isAwake: val }));
  }
}

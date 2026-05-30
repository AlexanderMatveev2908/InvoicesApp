import { createReducer, on } from '@ngrx/store';
import { Nullable } from '../../../common/types/general';
import { WakeUpActT } from './actions';

export interface WakeUpStateT {
  isAwake: boolean;
}

export const initState: WakeUpStateT = {
  isAwake: false,
};
export const wakeUpReducer = createReducer(
  initState,
  on(WakeUpActT.RESET__WAKE_UP_STATE, (_: WakeUpStateT) => initState),
  on(WakeUpActT.SET_WAKE_UP_STATE, (_: WakeUpStateT, action: WakeUpStateT) => ({ ...action })),
);

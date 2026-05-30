import { createAction, props } from '@ngrx/store';
import { WakeUpStateT } from '.';

export const WakeUpActT = {
  RESET__WAKE_UP_STATE: createAction('RESET__WAKE_UP_STATE'),
  SET_WAKE_UP_STATE: createAction('SET_WAKE_UP_STATE', props<WakeUpStateT>()),
};

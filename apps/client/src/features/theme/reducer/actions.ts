import { createAction, props } from '@ngrx/store';
import { ThemeStateT } from '.';

export const ThemeActT = {
  RESET__THEME_STATE: createAction('RESET__THEME_STATE'),
  SET_THEME: createAction('SET_THEME', props<ThemeStateT>()),
};

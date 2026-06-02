import { createFeatureSelector } from '@ngrx/store';
import { ThemeStateT } from '.';

export const getThemeState = createFeatureSelector<ThemeStateT>('theme');

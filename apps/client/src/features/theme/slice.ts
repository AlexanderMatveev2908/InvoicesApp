import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { Injectable, Signal } from '@angular/core';
import { getThemeState } from './reducer/selector';
import { ThemeActT } from './reducer/actions';
import { ThemeStateT, ThemeT } from './reducer';

@Injectable({
  providedIn: 'root',
})
export class ThemeSlice extends UseKitSliceSvc {
  public get themeState(): Signal<ThemeStateT> {
    return this.store.selectSignal(getThemeState);
  }

  private applyThemeDocument(theme: ThemeT): void {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  public resetTheme(): void {
    this.store.dispatch(ThemeActT.RESET__THEME_STATE());
    this.useStorage.setItem<ThemeT>('theme', 'light');
    this.applyThemeDocument('light');
  }

  public setTheme(arg: ThemeT): void {
    this.store.dispatch(ThemeActT.SET_THEME({ theme: arg }));
    this.useStorage.setItem<ThemeT>('theme', arg);
    this.applyThemeDocument(arg);
  }

  public toggleTheme(): void {
    const curr: ThemeT = this.themeState().theme;
    const newTheme: ThemeT = curr === 'light' ? 'dark' : 'light';

    this.setTheme(newTheme);
    this.useStorage.setItem<ThemeT>('theme', newTheme);
    this.applyThemeDocument(newTheme);
  }
}

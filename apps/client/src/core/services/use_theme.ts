import { ThemeSlice } from '@/features/theme/slice';
import { computed, inject, Injectable, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UseThemeSvc {
  private readonly themeSlice: ThemeSlice = inject(ThemeSlice);

  public readonly toggleTheme = (): void => {
    this.themeSlice.toggleTheme();
  };

  public readonly isDarkMode: Signal<boolean> = computed(
    () => this.themeSlice.themeState().theme === 'dark',
  );

  public readonly ifDark = (ifDark: string, ifLight: string): string => {
    return this.isDarkMode() ? ifDark : ifLight;
  };
}

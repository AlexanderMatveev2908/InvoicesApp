import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from '@/layout/toast/toast';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { ThemeSlice } from '@/features/theme/slice';
import { UseStorageSvc } from '@/core/services/use_storage';
import { UsePlatformSvc } from '@/core/services/use_platform';
import { ThemeT } from '@/features/theme/reducer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, WakeUp],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  private readonly themeSlice: ThemeSlice = inject(ThemeSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  ngAfterViewInit(): void {
    if (this.usePlatform.isServer) return;

    const theme = this.useStorage.getItem('theme');
    if (!theme) return;

    if (!['light', 'dark'].includes(theme as ThemeT)) return;
    this.themeSlice.setTheme(theme as ThemeT);
  }
}

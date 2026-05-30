import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { LibLog } from '../../core/lib/logger';
import { WakeUpApiSvc } from '../../features/wakeup/api';
import { ToastSlice } from '../../features/toast/slice';
import { UsePlatformSvc } from '../../core/services/use_platform';
import { switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements AfterViewInit {
  private wakeUpSvc: WakeUpApiSvc = inject(WakeUpApiSvc);
  private usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  ngAfterViewInit(): void {
    this.usePlatform
      .whenClientStable(timer(2000).pipe(switchMap(() => this.wakeUpSvc.wakeUp())))
      .subscribe((res) => {
        LibLog.main('result', res);
      });
  }
}

import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { LibLog } from '../../core/lib/logger';
import { WakeUpApiSvc } from '../../features/wakeup/api';
import { ToastSlice } from '../../features/toast/slice';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements AfterViewInit {
  private wakeUpSvc: WakeUpApiSvc = inject(WakeUpApiSvc);

  ngAfterViewInit(): void {
    setTimeout(() => {
      const res = this.wakeUpSvc.wakeUp().subscribe();
      LibLog.main('result', res);
    }, 2000);
  }
}

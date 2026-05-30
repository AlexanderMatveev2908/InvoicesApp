import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { LibLog } from '../../core/lib/logger';
import { WakeUpApiSvc } from '../../features/wakeup/api';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  private wakeUpSvc: WakeUpApiSvc = inject(WakeUpApiSvc);

  ngOnInit(): void {
    const res = this.wakeUpSvc.wakeUp().subscribe();
    LibLog.main('result', res);
  }
}

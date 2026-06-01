import { UseApiTrackerHk } from '@/core/hooks/use_api_tracker';
import { WakeUpApiSvc } from '@/features/wake_up/api';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BgBlack } from '../bg_black/bg-black';

@Component({
  selector: 'app-wake-up',
  imports: [BgBlack],
  providers: [UseApiTrackerHk],
  templateUrl: './wake-up.html',
  styleUrl: './wake-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WakeUp {
  private readonly useApiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);
  private readonly wakeUpApi: WakeUpApiSvc = inject(WakeUpApiSvc);

  ngAfterViewInit(): void {
    this.useApiTracker.track(this.wakeUpApi.wakeUp()).subscribe();
  }
}

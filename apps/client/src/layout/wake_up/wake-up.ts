import { WakeUpApiSvc } from '@/features/wake_up/api';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-wake-up',
  imports: [],
  templateUrl: './wake-up.html',
  styleUrl: './wake-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WakeUp {
  private readonly wakeUpApi: WakeUpApiSvc = inject(WakeUpApiSvc);

  ngAfterViewInit(): void {
    this.wakeUpApi.wakeUp().subscribe();
  }
}

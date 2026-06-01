import { ToastSlice } from '@/features/toast/slice';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements AfterViewInit {
  private readonly toastSlice: ToastSlice = inject(ToastSlice);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.toastSlice.openToast({
        eventT: 'WARN',
        msg: 'banana',
        status: 300,
      });
    }, 2000);
  }
}

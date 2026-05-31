import { UseNavSvc } from '@/core/services/use_nav';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements AfterViewInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.useNav.pushNotice({
        cb: null,
        tmpt: 'HOME',
        eventT: 'INFO',
        msg: 'banana',
        status: 205,
      });
    }, 2000);
  }
}

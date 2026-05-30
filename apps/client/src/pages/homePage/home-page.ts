import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UseNavSvc } from '../../core/services/use_nav';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements AfterViewInit {
  private useNav: UseNavSvc = inject(UseNavSvc);

  ngAfterViewInit(): void {
    this.useNav.push('notice', {
      from: 'OK',
    });
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderHomeMobile } from '@/common/components/mobile/header_home_mobile/header-home-mobile';

@Component({
  selector: 'app-home-page',
  imports: [HeaderHomeMobile],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}

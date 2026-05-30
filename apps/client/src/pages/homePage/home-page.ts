import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LibLog } from '../../core/lib/logger';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  ngOnInit(): void {}
}

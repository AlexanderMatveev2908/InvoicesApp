import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-spin-page-ssr',
  imports: [],
  templateUrl: './spin-page-ssr.html',
  styleUrl: './spin-page-ssr.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinPageSsr {}

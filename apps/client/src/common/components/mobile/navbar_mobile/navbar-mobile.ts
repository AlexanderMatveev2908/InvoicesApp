import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgAdvLogoApp } from '../../svgs/advanced/logo_app/logo-app';

@Component({
  selector: 'app-navbar-mobile',
  imports: [NgComponentOutlet],
  templateUrl: './navbar-mobile.html',
  styleUrl: './navbar-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMobile {
  public readonly SvgLogo = SvgAdvLogoApp;
}

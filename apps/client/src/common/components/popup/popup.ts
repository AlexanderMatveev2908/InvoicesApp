import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import { BgBlack } from '@/layout/bg_black/bg-black';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { NgClass } from '@angular/common';
import { UseThemeSvc } from '@/core/services/use_theme';

@Component({
  selector: 'app-popup',
  imports: [BgBlack, NgClass],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popup extends UseInjCtxHk {
  public readonly isPop: InputSignal<boolean> = input.required();

  public readonly useTheme: UseThemeSvc = inject(UseThemeSvc);

  public readonly title: InputSignal<string> = input.required();
  public readonly description: InputSignal<string> = input.required();
  public readonly action: InputSignal<string> = input.required();
  public readonly cb: InputSignal<() => void> = input.required();
  public readonly toggle: InputSignal<() => void> = input.required();
  public readonly isPending: InputSignal<boolean> = input.required();
}

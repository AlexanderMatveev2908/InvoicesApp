import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  InputSignal,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { UseMetaEventDir } from '../../core/directives/use_meta_event';
import { UseInjCtxHk } from '../../core/hooks/use_inj_ctx';
import { RefTemplateT } from '../../common/types/dom';
import { AppEventT } from '../../common/types/general';
import { SpinPageSsr } from '../../common/components/spins/spin_page_ssr/spin-page-ssr';

@Component({
  selector: 'app-page-wrapper',
  imports: [NgTemplateOutlet, UseMetaEventDir, SpinPageSsr],
  templateUrl: './page-wrapper.html',
  styleUrl: './page-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageWrapper extends UseInjCtxHk implements AfterViewInit {
  // ? local state
  public readonly isHydrated: WritableSignal<boolean> = signal(false);

  // ? personal props
  public readonly waitClient: InputSignal<boolean> = input.required();
  public readonly isPending: InputSignal<boolean> = input(false);
  public readonly minH: InputSignal<string> = input('100vh');
  public readonly eventT: InputSignal<AppEventT> = input<AppEventT>('NONE');

  // ? children
  @ContentChild('contentRef', { read: TemplateRef })
  public contentRef: RefTemplateT;

  // ? derived
  public readonly isServer: boolean = this.usePlatform.isServer;

  // ? ng lifecycle
  ngAfterViewInit(): void {
    this.usePlatform.onClient(() => {
      this.isHydrated.set(true);
    });
  }
}

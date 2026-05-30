import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PageWrapper } from '../../../../layout/page_wrapper/page-wrapper';
import { UseMetaEventDir } from '../../../../core/directives/use_meta_event';
import { UseInjCtxHk } from '../../../../core/hooks/use_inj_ctx';
import { ElDomT, RefTemplateT } from '../../../types/dom';
import { NoticeAnimations } from './etc/animations';
import { NoticeStateT } from '../../../../features/notice/reducer';

@Component({
  selector: 'app-notice-wrapper-csr',
  imports: [NgComponentOutlet, PageWrapper],
  templateUrl: './notice-wrapper-csr.html',
  styleUrl: './notice-wrapper-csr.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeWrapperCsr extends UseInjCtxHk implements AfterViewInit {
  // ? directives
  public readonly useMetaDir: UseMetaEventDir = inject(UseMetaEventDir);

  // ? personal props
  public readonly props: InputSignal<NoticeStateT> = input.required();

  // ? template
  @ViewChild('contentRef', { read: TemplateRef })
  public contentRef: RefTemplateT;

  // ? projected
  // @ContentChild('footer', { read: TemplateRef }) footerTpl: RefTemplateT;

  private run: boolean = false;

  // ? animations
  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    if (this.run) return;
    this.run = true;

    this.useDOM(() => {
      const svgDOM: ElDomT = document.getElementById('csr_notice__svg_wrap');
      const contentDOM: ElDomT = document.getElementById('csr_notice__content');
      const spanStatusDOM: ElDomT = document.getElementById('csr_notice__span_status');
      const spanMsgDOM: ElDomT = document.getElementById('csr_notice__span_msg');

      NoticeAnimations.main({
        contentDOM,
        spanMsgDOM,
        spanStatusDOM,
        svgDOM,
      });
    });
  }
}

import { ElDomT } from '@/common/types/dom';
import { Nullable, SvgT } from '@/common/types/general';
import { LibMetaEvent } from '@/core/lib/meta_event';
import { UseNavSvc } from '@/core/services/use_nav';
import { UseStorageSvc } from '@/core/services/use_storage';
import { NoticeStateT } from '@/features/notice/reducer';
import { NoticeSlice } from '@/features/notice/slice';
import { NgComponentOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { NoticeAnimations } from './animations';
import { UsePlatformSvc } from '@/core/services/use_platform';
import { PageWrapper } from '@/common/components/hoc/page_wrapper/page-wrapper';

@Component({
  selector: 'app-notice-page',
  imports: [NgComponentOutlet, PageWrapper],
  templateUrl: './notice-page.html',
  styleUrl: './notice-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticePage implements OnInit, AfterViewInit {
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  public readonly isClient: boolean = this.usePlatform.isClient;
  public readonly noticeState: Signal<NoticeStateT> = computed(() =>
    this.noticeSlice.noticeState(),
  );
  public readonly Svg: Signal<SvgT> = computed(() =>
    LibMetaEvent.svgByT(this.noticeState().eventT),
  );
  public readonly mainColor: Signal<string> = computed(() =>
    LibMetaEvent.cssVarByT(this.noticeState().eventT),
  );

  private run: boolean = false;

  ngOnInit(): void {
    this.useNav.usePlatform.onClient(() => {
      const stored: Nullable<Omit<NoticeStateT, 'cb'>> = this.useStorage.getItem('notice');
      if (stored)
        this.noticeSlice.setNotice({
          ...stored,
          cb: null,
        });
    });

    this.useNav.pushOutIfNotFrom('/notice');
  }

  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    if (this.run) return;
    this.run = true;

    const svgDOM: ElDomT = document.getElementById('svg__content');
    const statusDOM: ElDomT = document.getElementById('root__status');
    const msgDOM: ElDomT = document.getElementById('root__msg');
    const contentDOM: ElDomT = document.getElementById('root__content');

    if ([svgDOM, msgDOM, statusDOM, contentDOM].some((el: ElDomT) => !el)) return;

    NoticeAnimations.main(svgDOM, msgDOM, statusDOM, contentDOM);
  }
}

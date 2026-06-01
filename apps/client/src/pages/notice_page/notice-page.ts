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
import { UsePlatformSvc } from '@/core/services/use_platform';
import { PageWrapper } from '@/common/components/hoc/page_wrapper/page-wrapper';

@Component({
  selector: 'app-notice-page',
  imports: [NgComponentOutlet, PageWrapper],
  templateUrl: './notice-page.html',
  styleUrl: './notice-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticePage implements OnInit {
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
}

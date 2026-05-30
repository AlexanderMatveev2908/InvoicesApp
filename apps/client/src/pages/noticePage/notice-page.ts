import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { UseNavSvc } from '../../core/services/use_nav';
import { NoticeSlice } from '../../features/notice/slice';
import { UseStorageSvc } from '../../core/services/use_storage';
import { NoticeStateT } from '../../features/notice/reducer';
import { Nullable } from '../../common/types/general';
import { SvgT } from '../../common/types/dom';
import { LibMetaEvent } from '../../core/lib/css/events';
import { NoticeWrapperCsr } from '../../common/components/hoc/notice_wrapper_csr/notice-wrapper-csr';
import { UseMetaEventDir } from '../../core/directives/use_meta_event';

@Component({
  selector: 'app-notice-page',
  imports: [NoticeWrapperCsr, UseMetaEventDir],
  templateUrl: './notice-page.html',
  styleUrl: './notice-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticePage implements OnInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);

  // ? notice props
  public readonly noticeState: Signal<NoticeStateT> = computed(() => {
    const noticeState = this.noticeSlice.noticeState();
    return noticeState;
  });

  public Svg: SvgT = LibMetaEvent.svgByT(this.noticeState().eventT);

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

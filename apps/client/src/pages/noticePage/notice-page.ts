import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { UseNavSvc } from '../../core/services/use_nav';
import { NoticeSlice } from '../../features/notice/slice';
import { UseStorageSvc } from '../../core/services/use_storage';
import { NoticeStateT } from '../../features/notice/reducer';
import { Nullable } from '../../common/types/general';
import { PageWrapper } from '../../layout/page_wrapper/page-wrapper';

@Component({
  selector: 'app-notice-page',
  imports: [PageWrapper],
  templateUrl: './notice-page.html',
  styleUrl: './notice-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticePage {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);

  // ? notice props
  public readonly noticeProps: Signal<NoticeStateT> = computed(() => {
    const noticeState = this.noticeSlice._noticeState();
    return noticeState;
  });

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

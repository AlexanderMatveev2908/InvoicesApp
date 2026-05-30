import { computed, Directive, inject, Signal, ViewChild } from '@angular/core';
import { UsePlatformSvc } from '../../../../core/services/use_platform';
import { ToastSlice } from '../../../../features/toast/slice';
import { ToastStateT } from '../../../../features/toast/reducer/reducer';
import { RefDomT } from '../../../../common/types/dom';
import { TimerIdT } from '../../../../common/types/general';
import { LibTimer } from '../../../../core/lib/timer';

@Directive()
export abstract class ToastRoot {
  // ? svc
  protected readonly toastSlice: ToastSlice = inject(ToastSlice);
  protected readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? derived
  public readonly toastState: Signal<ToastStateT> = computed(() => this.toastSlice.toastState());
  public readonly isClient: boolean = this.usePlatform.isClient;

  // ? children
  @ViewChild('toast') toast: RefDomT;
  @ViewChild('timerToast') timerToast: RefDomT;

  // ? local state
  protected timerID: TimerIdT = null;

  // ? private helper & listeners
  public readonly closeClick: () => void = () => {
    // ? always first clear timer on close
    // ? it means process finished completely
    this.timerID = LibTimer.clearTmr(this.timerID);
    this.toastSlice.closeToast();
  };
}

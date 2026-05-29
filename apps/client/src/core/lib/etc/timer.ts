import { TimerIdT } from '../../../common/types/etc';

export class LibTimer {
  public static clearTmr(timerRef: TimerIdT): null {
    if (timerRef) clearTimeout(timerRef);
    return null;
  }
}

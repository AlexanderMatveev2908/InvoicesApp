import { TimerIdT } from '../../common/types/general';

export class LibTimer {
  public static clearTmr(timerRef: TimerIdT): null {
    if (timerRef) clearTimeout(timerRef);
    return null;
  }
}

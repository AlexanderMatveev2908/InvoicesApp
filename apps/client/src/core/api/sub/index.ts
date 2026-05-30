import { Injectable } from '@angular/core';
import { ObsOnOkT, ObsResT } from '../../../common/types/api';
import { LibApiArgs } from '../../lib/data_structures/api_args';
import { _UseSideEffectsMngToastHk } from './2.toast';

@Injectable({
  providedIn: 'root',
})
export class _UseSideEffectsMngSvc extends _UseSideEffectsMngToastHk {
  public main<T, K>(cb: ObsResT<T>, args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.withToast(this.withLog(cb), args.getOptToast());
  }
}

import { Injectable } from '@angular/core';
import { _UseSideEffectsMngLogHk } from './1.log';
import { ObsOnOkT, ObsResT } from '../../../common/types/api';
import { LibApiArgs } from '../../lib/data_structures/api_args';

@Injectable({
  providedIn: 'root',
})
export class _UseSideEffectsMngSvc extends _UseSideEffectsMngLogHk {
  public main<T, K>(cb: ObsResT<T>, args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.withLog(cb);
  }
}

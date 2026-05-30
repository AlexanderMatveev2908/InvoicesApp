import { Injectable } from '@angular/core';
import { _UseSideEffectsMngInitHk } from './0.init';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { ConfApiT, ErrApiT, ObsResT, ResApiT } from '../../../common/types/api';
import { Nullable } from '../../../common/types/general';
import { envVars } from '../../../environments/environment';
import { LibLog } from '../../lib/logger';

@Injectable()
export abstract class _UseSideEffectsMngLogHk extends _UseSideEffectsMngInitHk {
  private _log<T>(res: ResApiT<T> | ErrApiT<T>, emoji: string): void {
    const conf: Nullable<ConfApiT> = this.confApi.getCurr();
    const content: ResApiT<T> = res instanceof HttpErrorResponse ? res.error : res;

    const title: string = (conf?.url ?? 'Unknown url').replace(envVars.backURL, '').split('?')[0];

    LibLog.main(`${emoji} ${title}`, conf, content);
  }

  protected withLog<T>(cb: ObsResT<T>): ObsResT<T> {
    return cb.pipe(
      tap({
        next: (res: ResApiT<T>) => this.usePlatform.onClient(() => this._log(res, '✅')),
        error: (err: ErrApiT<T>) => this._log(err, '❌'),
      }),
    );
  }
}

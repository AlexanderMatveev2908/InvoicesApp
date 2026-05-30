import { inject, Injectable } from '@angular/core';
import { UseConfApiSvc } from '../../services/use_conf_api';
import { UseInjCtxHk } from '../../hooks/use_inj_ctx';

@Injectable()
export abstract class _UseSideEffectsMngInitHk extends UseInjCtxHk {
  protected readonly confApi: UseConfApiSvc = inject(UseConfApiSvc);
  protected readonly DEF_CLIENT_ERR_MSG: string =
    'A wild Snorlax fall asleep blocking the road 💤. Try later';
}

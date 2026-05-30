import { HttpErrorResponse, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Dict, Nullable } from '../../../../common/types/general';
import { LibShape } from '../../../lib/data_structures/shape';
import { UseConfApiSvc } from '../../../services/use_conf_api';
import { LibApiShape } from '../../../lib/data_structures/api';
import { ConfApiT, HttpMethod, HttpResT } from '../../../../common/types/api';

export class ConfApiMdwMng {
  private static getRequestBody(req: HttpRequest<unknown>): Nullable<Dict> {
    let dataSent: Nullable<Dict>;

    if (['GET', 'DELETE'].some((str: string) => str === req.method)) dataSent = null;
    else dataSent = (req.body || null) as Nullable<Dict>;

    return dataSent;
  }

  private static getRequestQuery(req: HttpRequest<unknown>): Nullable<Dict> {
    const reqParams: HttpParams = req.params;
    const params: Dict = {};
    for (const k of reqParams.keys()) params[k] = reqParams.get(k);

    return LibShape.hasObjData(params) ? params : null;
  }

  public static main(
    req: HttpRequest<unknown>,
    e: HttpEvent<unknown> | HttpErrorResponse,
    confApi: UseConfApiSvc,
  ): void {
    if (!LibApiShape.isHttpRes(e)) return;

    const res: HttpResT = e as HttpResT;
    const urlReq: string = (res.url ?? '').split('?')[0];

    const conf: ConfApiT = {
      url: urlReq,
      method: req.method as HttpMethod,
      responseType: res.headers.get('Content-Type') || null,
      requestType: req.headers.get('Content-Type') || null,
      accessToken: req.headers.get('Authorization') || null,
      params: this.getRequestQuery(req),
      body: this.getRequestBody(req),
      rateLimit: {
        window: res.headers.get('RateLimit-Window'),
        limit: res.headers.get('RateLimit-Limit'),
        remaining: res.headers.get('RateLimit-Remaining'),
        reset: res.headers.get('RateLimit-Reset'),
      },
    };

    confApi.setNext(conf);
  }
}

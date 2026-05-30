import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UseConfApiSvc } from '../../../services/use_conf_api';
import { inject } from '@angular/core';
import { ConfApiMdwMng } from './mng';

export const useConfApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const confApi: UseConfApiSvc = inject(UseConfApiSvc);

  return next(req).pipe(
    tap({
      next: (e: HttpEvent<unknown>) => ConfApiMdwMng.main(req, e, confApi),
      error: (e: HttpEvent<unknown>) => ConfApiMdwMng.main(req, e, confApi),
    }),
  );
};

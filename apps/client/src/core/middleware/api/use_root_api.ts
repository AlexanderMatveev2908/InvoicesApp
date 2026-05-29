import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { envVars } from '../../../environments/environment';

export const useRootApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const baseURL: string = envVars.backURL;

  const clone = req.clone({
    url: `${baseURL}${req.url}`,
    setHeaders: {
      Authorization: '',
    },
    withCredentials: true,
  });

  return next(clone);
};

import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { UseStorageSvc } from '../../../services/use_storage';
import { envVars } from '../../../../environments/environment';

export const useRootApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const useStorage = inject(UseStorageSvc);
  const jwt = useStorage.getItem('accessToken');

  const baseURL: string = envVars.backURL;

  const clone = req.clone({
    url: `${baseURL}${req.url}`,
    setHeaders: {
      Authorization: jwt ? `Bearer ${jwt}` : '',
    },
    withCredentials: true,
  });

  return next(clone);
};

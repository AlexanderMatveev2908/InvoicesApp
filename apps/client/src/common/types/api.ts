import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Dict, Nullable } from './general';

export enum ApiStatusT {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  ENTITY_UNPROCESSABLE = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ConfApiT {
  url: Nullable<string>;
  method: HttpMethod;
  requestType: Nullable<string>;
  responseType: Nullable<string>;
  accessToken: Nullable<string>;
  params: Nullable<Dict>;
  body: Nullable<Dict>;
  rateLimit: {
    limit: Nullable<string>;
    window: Nullable<string>;
    remaining: Nullable<string>;
    reset: Nullable<string>;
  };
}

export type HttpResT = HttpResponse<unknown> | HttpErrorResponse;

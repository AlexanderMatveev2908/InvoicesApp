import { HttpParams } from '@angular/common/http';
import { Dict, None, Nullable, OrNone } from '../../../common/types/general';
import { ErrApp } from '../err';
import { LibFormPrs } from './form_parser';

export class LibApiArgs<T> {
  private readonly _url: string = '';
  private _params: Nullable<HttpParams> = null;
  private _body: Nullable<T | FormData> = null;

  constructor(url: string) {
    this._url = url;
  }

  private parseQuery<Q>(query: Q): HttpParams {
    if (!query) throw new ErrApp('invalid arg parseQuery');
    return new HttpParams({ fromString: LibFormPrs.genParamsURL(query) });
  }

  public static withURL<K>(url: string): LibApiArgs<K> {
    return new LibApiArgs(url);
  }

  public query<Q>(query: Q): LibApiArgs<T> {
    this._params = this.parseQuery(query);
    return this;
  }

  public body(body: T | FormData): LibApiArgs<T> {
    this._body = body;
    return this;
  }

  public getUrl(): string {
    return this._url;
  }

  public getParamsOr(ifEmpty: None = null): OrNone<HttpParams> {
    return !this._params ? ifEmpty : this._params;
  }

  public getBody(): Nullable<T | FormData> {
    return this._body;
  }

  public httpOptions(): Dict {
    const options: Dict =
      !this._body || this._body instanceof FormData
        ? {}
        : { headers: { 'Content-Type': 'application/json' } };

    return options;
  }
}

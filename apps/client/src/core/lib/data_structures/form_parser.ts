import { Dict, OrNone } from '../../../common/types/general';
import { ErrApp } from '../err';
import { LibShape } from './shape';

export class LibFormPrs {
  private static appendPrimitive(params: URLSearchParams | FormData, k: string, v: unknown): void {
    params.append(k, typeof v === 'string' ? v : v + '');
  }

  private static handleList(
    formParams: URLSearchParams | FormData,
    key: string,
    v: unknown[],
  ): void {
    const arrayKey = key + '[]';

    for (const vv of v)
      if (LibShape.isObj(vv)) this.nestingMng(vv, formParams, arrayKey);
      else this.appendPrimitive(formParams, arrayKey, vv);
  }

  private static nestingMng(
    arg: unknown,
    formData: URLSearchParams | FormData,
    prefix: string = '',
  ): URLSearchParams | FormData {
    if (!LibShape.hasObjData(arg)) throw new ErrApp('passed falsy value where expected Dict');

    for (const [k, v] of Object.entries(arg as Dict)) {
      if (LibShape.isNone(v)) continue;

      const key: string = prefix ? `${prefix}[${k}]` : k;

      if (Array.isArray(v)) this.handleList(formData, key, v);
      else if (LibShape.isObj(v)) this.nestingMng(v, formData, key);
      else this.appendPrimitive(formData, key, v);
    }

    return formData;
  }

  public static genParamsURL(obj: unknown): string {
    return this.nestingMng(obj, new URLSearchParams()).toString();
  }

  public static genFormData(obj: unknown): FormData {
    const result: FormData | URLSearchParams = this.nestingMng(obj, new FormData());

    if (!(result instanceof FormData)) throw new ErrApp('bug generating dynamic nested forms');

    return result;
  }
}

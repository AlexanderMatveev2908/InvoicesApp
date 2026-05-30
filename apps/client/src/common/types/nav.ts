import { Nullable } from './etc';

export type NavFromT = 'err' | 'ok';

export interface MetaNavT {
  from: Nullable<NavFromT>;
}

export interface NavOptT {
  replace: boolean;
  from: Nullable<NavFromT>;
}

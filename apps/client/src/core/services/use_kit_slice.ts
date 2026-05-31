import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreStateT } from '../store';

@Injectable({
  providedIn: 'root',
})
export class UseKitSliceSvc {
  protected readonly store: Store<StoreStateT> = inject(Store<StoreStateT>);
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfApiT } from '../../common/types/api';
import { Nullable } from '../../common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class UseApiConfSvc {
  private readonly conf: BehaviorSubject<Nullable<ConfApiT>> = new BehaviorSubject<
    Nullable<ConfApiT>
  >(null);

  setNext(conf: ConfApiT): void {
    this.conf.next(conf);
  }

  getCurr(): Nullable<ConfApiT> {
    return this.conf.value;
  }

  asObs(): Observable<Nullable<ConfApiT>> {
    return this.conf.asObservable();
  }
}

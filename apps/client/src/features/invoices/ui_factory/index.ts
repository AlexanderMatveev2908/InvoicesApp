import { TxtInputFormT } from '@/common/types/dom';

export class InvoicesUiFct {
  public static readonly billFromStreet: TxtInputFormT = {
    label: 'Street Address',
    name: 'billFromStreet',
    type: 'text',
  };

  public static readonly billFromCity: TxtInputFormT = {
    label: 'City',
    name: 'billFromCity',
    type: 'text',
  };
}

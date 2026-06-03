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

  public static readonly billFromZip: TxtInputFormT = {
    label: 'Post Code',
    name: 'billFromZip',
    type: 'text',
  };
  public static readonly billFromCountry: TxtInputFormT = {
    label: 'Country',
    name: 'billFromCountry',
    type: 'text',
  };
  public static readonly billToClientName: TxtInputFormT = {
    label: 'Client’s Name',
    name: 'billToClientName',
    type: 'text',
  };
  public static readonly billToClientMail: TxtInputFormT = {
    label: 'Client’s Email',
    name: 'billToClientMail',
    type: 'text',
  };

  public static readonly billToStreet: TxtInputFormT = {
    label: 'Street Address',
    name: 'billToStreet',
    type: 'text',
  };

  public static readonly billToCity: TxtInputFormT = {
    label: 'City',
    name: 'billToCity',
    type: 'text',
  };
  public static readonly billToZip: TxtInputFormT = {
    label: 'Postal Code',
    name: 'billToZip',
    type: 'text',
  };
  public static readonly billToCountry: TxtInputFormT = {
    label: 'Country',
    name: 'billToCountry',
    type: 'text',
  };
  public static readonly invoiceDate: TxtInputFormT = {
    label: 'Invoice Date',
    name: 'invoiceDate',
    type: 'text',
  };
}

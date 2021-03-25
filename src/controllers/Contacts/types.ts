export enum ContactsFieldsEnum {
  identify = 'identify',
  name = 'name',
}

export interface Contact {
  readonly [ContactsFieldsEnum.identify]: string;
  readonly [ContactsFieldsEnum.name]: string;
}

export interface ContactWithId extends Contact {
  readonly id: number;
}

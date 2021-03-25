export enum UserFieldsEnum {
  username = 'username',
  password = 'password',
  email = 'email',
}

export interface User {
  readonly [UserFieldsEnum.username]: string;
  readonly [UserFieldsEnum.password]: string;
  readonly [UserFieldsEnum.email]: string;
}

export interface UserWithId extends User {
  readonly id: number;
}

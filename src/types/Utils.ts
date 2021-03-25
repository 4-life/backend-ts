import { CommonErrorProperties } from 'sequelize/types';

export enum Messages {
  Ok = 'OK',
  ServerError = 'Server Error',
  IncorrectLoginPassword = 'Wrong credentials!',
}

export const ERR = 'error';
export type DbError = { ERR: CommonErrorProperties };

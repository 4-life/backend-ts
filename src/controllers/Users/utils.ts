import { User, UserFieldsEnum } from './types';

export function checkFields(data: Record<string, string>): { error: string | null } {
  const fields: Array<keyof User> = [
    UserFieldsEnum.email,
    UserFieldsEnum.password,
    UserFieldsEnum.username
  ];

  // check for unknown fields
  const unknown = checkFieldsIsUnknown<User>(fields, data);
  if (unknown) {
    return { error: `Unknown field: "${unknown.key}"` };
  }

  // check for required fields
  const fileds: Array<keyof User> = Object.keys(UserFieldsEnum) as UserFieldsEnum[];
  const required = checkFieldsExist(fileds, data as unknown as User);

  if (required) {
    return { error: `User data is not valid. Field "${required.key}" is missing` };
  }

  // check email
  const email = validateEmail((data as unknown as User).email);
  if (!email) {
    return { error: `Email is not valid` };
  }

  return { error: null };
}

export function checkFieldsIsUnknown<T>(fields: Array<keyof T>, obj: Record<string, string>): { 'key': string } | void {
  const queryKeys = Object.keys(obj) as Array<keyof T>;

  for (const key of queryKeys) {
    if (!fields.includes(key)) {
      return { key: String(key) };
    }
  }
}

export function validateEmail(email: string): boolean {
  const pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  return pattern.test(email);
}

export function checkFieldsExist(fileds: Array<keyof User>, obj: User): { 'key': string } | void {
  for (const field of fileds) {
    if (!(field in obj)) {
      return { key: String(field) };
    }
  }
}

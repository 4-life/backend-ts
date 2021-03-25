
export function validateIdentify(identify: string): boolean {
  return /^[a-zA-Z-_]+$/.test(identify) && identify.length < 128;
}

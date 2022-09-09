import { Gender } from '../types';

const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String;
};

const isDate = (value: string): boolean => Boolean(Date.parse(value));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (value: any): value is Gender =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.values(Gender).includes(value);

export default {
  isString,
  isDate,
  isGender,
};

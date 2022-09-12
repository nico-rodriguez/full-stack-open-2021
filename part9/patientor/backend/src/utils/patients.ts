import { Entry, Gender, NewPatientEntry } from '../types';
import common from './common';

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

const parseName = (name: unknown): string => {
  if (!name || !common.isString(name)) {
    throw new Error(`Incorrect or missing name ${name}`);
  }

  return name;
};

const parseDataOfBirth = (date: unknown): string => {
  if (!date || !common.isString(date) || !common.isDate(date)) {
    throw new Error(`Incorrect or missing date ${date}`);
  }

  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !common.isString(ssn)) {
    throw new Error(`Incorrect or missing SSN: ${ssn}`);
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !common.isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !common.isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: PatientFields): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDataOfBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: entries as Entry[],
  };

  return newPatient;
};

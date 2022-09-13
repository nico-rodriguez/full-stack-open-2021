import {
  Diagnose,
  Entry,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
  NewPatientEntry,
} from '../types';
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

const parseDateOfBirth = (date: unknown): string => {
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
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: entries as Entry[],
  };

  return newPatient;
};

interface EntryBaseFields {
  date: unknown;
  specialist: unknown;
  type: unknown;
  description: unknown;
  diagnosisCodes?: unknown;
}

interface HealthCheckEntryFields extends EntryBaseFields {
  type: 'HealthCheck';
  healthCheckRating: unknown;
}

interface HospitalEntryFields extends EntryBaseFields {
  type: 'Hospital';
  discharge: {
    date: unknown;
    criteria: unknown;
  };
}

interface OccupationalHealthcareEntryFields extends EntryBaseFields {
  type: 'OccupationalHealthCare';
  employerName: unknown;
  sickLeave: {
    startDate: unknown;
    endDate: unknown;
  };
}

export type EntryFields =
  | HealthCheckEntryFields
  | HospitalEntryFields
  | OccupationalHealthcareEntryFields;

const parseDate = (date: unknown): string => {
  if (!date || !common.isString(date) || !common.isDate(date)) {
    throw new Error(`Incorrect or missing date ${date}`);
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !common.isString(specialist)) {
    throw new Error(`Incorrect or missing specialist ${specialist}`);
  }

  return specialist;
};

const parseType = (
  type: unknown
): 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
  if (!type || !common.isString(type)) {
    throw new Error(`Incorrect or missing type ${type}`);
  }

  switch (type) {
    case 'HealthCheck':
    case 'Hospital':
    case 'OccupationalHealthcare':
      return type;
    default:
      throw new Error(`Invalid entry type: ${type}`);
  }
};

const parseDescription = (description: unknown): string => {
  if (!description || !common.isString(description)) {
    throw new Error(`Incorrect or missing description ${description}`);
  }

  return description;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnose['code']> => {
  if (
    !diagnosisCodes ||
    !Array.isArray(diagnosisCodes) ||
    !diagnosisCodes.every((code) => common.isString(code))
  ) {
    throw new Error(`Incorrect or missing diagnosisCodes ${diagnosisCodes}`);
  }

  return diagnosisCodes as Array<Diagnose['code']>;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !common.isString(healthCheckRating) ||
    !Object.keys(HealthCheckRating).includes(healthCheckRating)
  ) {
    throw new Error(
      `Incorrect or missing healthCheckRating ${healthCheckRating}`
    );
  }

  switch (healthCheckRating) {
    case 'Healthy':
      return HealthCheckRating.Healthy;
    case 'LowRisk':
      return HealthCheckRating.LowRisk;
    case 'HighRisk':
      return HealthCheckRating.HighRisk;
    case 'CriticalRisk':
      return HealthCheckRating.CriticalRisk;
    default:
      throw new Error(`Invalid health check rating: ${healthCheckRating}`);
  }
};

const parseDischargeCriteria = (dischargeCriteria: unknown): string => {
  if (!dischargeCriteria || !common.isString(dischargeCriteria)) {
    throw new Error(
      `Incorrect or missing discharge criteria ${dischargeCriteria}`
    );
  }

  return dischargeCriteria;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !common.isString(employerName)) {
    throw new Error(`Incorrect or missing discharge criteria ${employerName}`);
  }

  return employerName;
};

export const toNewEntry = (entry: EntryFields): NewEntry => {
  const baseEntry: NewBaseEntry = {
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    type: parseType(entry.type),
    description: parseDescription(entry.description),
  };

  if (entry.diagnosisCodes) {
    baseEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
  }

  switch (entry.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(entry.discharge.date),
          criteria: parseDischargeCriteria(entry.discharge.criteria),
        },
      };
    case 'OccupationalHealthCare':
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(entry.employerName),
        sickLeave: {
          startDate: parseDate(entry.sickLeave.startDate),
          endDate: parseDate(entry.sickLeave.endDate),
        },
      };
    default:
      throw new Error(`Invalid entry type ${entry}`);
  }
};

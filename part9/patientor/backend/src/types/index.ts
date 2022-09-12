export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

interface EntryBase {
  id: string;
  date: string;
  specialist: string;
  type: string;
  description: string;
}

interface HealthCheckEntry extends EntryBase {
  type: 'HealthCheck';
  healthCheckRating: 0 | 1;
}

interface HospitalEntry extends EntryBase {
  type: 'Hospital';
  diagnosisCodes: string[];
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends EntryBase {
  type: 'OccupationalHealthcare';
  employerName: string;
  diagnosisCodes: string[];
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;

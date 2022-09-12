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
  diagnosisCodes?: Array<Diagnose['code']>;
}

enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheckEntry extends EntryBase {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends EntryBase {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends EntryBase {
  type: 'OccupationalHealthcare';
  employerName: string;
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

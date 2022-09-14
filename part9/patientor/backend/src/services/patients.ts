import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';
import {
  Entry,
  NewEntry,
  NewPatientEntry,
  NonSensitivePatientData,
  Patient,
} from '../types';

const getEntries = (): Patient[] => patientsData;

const getEntryById = (id: string): Patient | undefined =>
  patientsData.find((patient) => patient.id === id);

const getNonSensitiveEntries = (): NonSensitivePatientData[] =>
  patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );

const addPatientEntry = (patientEntry: NewPatientEntry): Patient => {
  const id = uuidv4();
  const newPatient = { id, ...patientEntry };
  patientsData.push(newPatient);

  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const patient = getEntryById(patientId);

  if (!patient) {
    throw new Error(`Patient id ${patientId} not found`);
  }

  const id = uuidv4();
  const newEntry = { id, ...entry };
  patient.entries.push(newEntry);

  return newEntry;
};

const patientsService = {
  getEntries,
  getEntryById,
  getNonSensitiveEntries,
  addPatientEntry,
  addEntry,
};

export default patientsService;

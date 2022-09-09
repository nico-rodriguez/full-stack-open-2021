import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';
import { NewPatientEntry, NonSensitivePatientData, Patient } from '../types';

const getEntries = (): Patient[] => patientsData;

const getNonSensitiveEntries = (): NonSensitivePatientData[] =>
  patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const addEntry = (patientEntry: NewPatientEntry) => {
  const id = uuidv4();
  const newPatient = { id, ...patientEntry };
  patientsData.push(newPatient);

  return newPatient;
};

const patientsService = {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};

export default patientsService;

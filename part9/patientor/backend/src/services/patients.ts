import patientsData from '../../data/patients';
import { NonSensitivePatientData, Patient } from '../types';

const getEntries = (): Patient[] => patientsData;

const getNonSensitiveEntries = (): NonSensitivePatientData[] =>
  patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const addEntry = () => {
  return null;
};

const patientsService = {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};

export default patientsService;

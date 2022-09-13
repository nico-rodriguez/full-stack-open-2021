import diagnosesData from '../../data/diagnoses';

import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => diagnosesData;

const addDiagnosisEntry = () => {
  return null;
};

const diagnosesService = {
  getEntries,
  addDiagnosisEntry,
};

export default diagnosesService;

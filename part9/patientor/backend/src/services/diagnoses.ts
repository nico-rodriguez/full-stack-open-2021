import diagnosesData from '../../data/diagnoses';

import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => diagnosesData;

const addEntry = () => {
  return null;
};

const diagnosesService = {
  getEntries,
  addEntry,
};

export default diagnosesService;

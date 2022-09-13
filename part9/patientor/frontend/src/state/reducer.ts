import { State } from './state';
import { Diagnosis, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES_LIST';
      payload: Diagnosis[];
    };

export const setPatientList = (patientList: Patient[]): Action => ({
  type: 'SET_PATIENT_LIST',
  payload: patientList,
});

export const addPatient = (patient: Patient): Action => ({
  type: 'ADD_PATIENT',
  payload: patient,
});

export const setDiagnosesList = (diagnosesList: Diagnosis[]): Action => ({
  type: 'SET_DIAGNOSES_LIST',
  payload: diagnosesList,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSES_LIST':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
        },
      };
    default:
      return state;
  }
};

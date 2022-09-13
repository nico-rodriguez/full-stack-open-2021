import { Diagnosis, Entry } from '../types';
import { assertNever } from '../utils';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalHealthCareEntryDetails from './OccupationalHealthCareEntryDetails';

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: {
    [code: string]: Diagnosis;
  };
}
const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthCareEntryDetails
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

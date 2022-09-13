import { Card } from '@material-ui/core';
import { Diagnosis, HospitalEntry } from '../types';

interface HospitalEntryDetailsProps {
  entry: HospitalEntry;
  diagnoses: {
    [code: string]: Diagnosis;
  };
}

const HospitalEntryDetails = ({
  entry,
  diagnoses,
}: HospitalEntryDetailsProps) => {
  return (
    <Card key={entry.id}>
      {entry.date} {entry.type} {entry.discharge.criteria}
      <br />
      <em>{entry.description}</em>
      <br />
      diagnose by {entry.specialist}
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses[code].name}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default HospitalEntryDetails;

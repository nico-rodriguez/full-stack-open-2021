import { Card } from '@material-ui/core';
import WorkIcon from '@mui/icons-material/Work';
import { Diagnosis, OccupationalHealthcareEntry } from '../types';

interface OccupationalHealthCareEntryDetailsProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: {
    [code: string]: Diagnosis;
  };
}

const OccupationalHealthCareEntryDetails = ({
  entry,
  diagnoses,
}: OccupationalHealthCareEntryDetailsProps) => {
  return (
    <Card key={entry.id}>
      {entry.date} <WorkIcon /> <em>{entry.employerName}</em>
      <br />
      <em>{entry.description}</em>
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

export default OccupationalHealthCareEntryDetails;

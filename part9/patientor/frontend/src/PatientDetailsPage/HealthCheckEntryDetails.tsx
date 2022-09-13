import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { green, yellow, orange, red } from '@mui/material/colors';
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from '../types';
import { assertNever } from '../utils';
import { Card } from '@material-ui/core';

interface HealthCheckEntryDetailsProps {
  entry: HealthCheckEntry;
  diagnoses: {
    [code: string]: Diagnosis;
  };
}

const healthRatingToColor = (healthRating: HealthCheckRating): string => {
  switch (healthRating) {
    case HealthCheckRating.Healthy:
      return green[500];
    case HealthCheckRating.LowRisk:
      return yellow[500];
    case HealthCheckRating.HighRisk:
      return orange[500];
    case HealthCheckRating.CriticalRisk:
      return red[500];
    default:
      return assertNever(healthRating);
  }
};

const HealthCheckEntryDetails = ({
  entry,
  diagnoses,
}: HealthCheckEntryDetailsProps) => {
  const healthRatingColor = healthRatingToColor(entry.healthCheckRating);

  return (
    <Card key={entry.id}>
      {entry.date} <MedicalServicesIcon />
      <br />
      <em>{entry.description}</em>
      <br />
      <FavoriteIcon htmlColor={healthRatingColor} />
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

export default HealthCheckEntryDetails;

import { Box, Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';

const PatientDetailsPage = () => {
  const { patientId } = useParams<{ patientId: string }>();

  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (loading) {
      axios
        .get<Patient>(`${apiBaseUrl}/patients/${patientId as string}`)
        .then((response) => {
          const patient = response.data;
          setPatient(patient);
          setLoading(false);
        })
        .catch((error: unknown) => {
          setLoading(false);
          if (axios.isAxiosError(error)) {
            console.error(error?.response?.data || 'Unrecognized axios error');
          } else {
            console.error('Unknown error', error);
          }
        });
    }
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  if (!patient) {
    return <div>could not get patient</div>;
  }

  return (
    <Box>
      <Typography variant='h5'>
        {patient.name} ({patient.gender})
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography variant='h6'>entries</Typography>
      {patient.entries.map((entry) => (
        <>
          {entry.date} <em>{entry.description}</em>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </>
      ))}
    </Box>
  );
};

export default PatientDetailsPage;

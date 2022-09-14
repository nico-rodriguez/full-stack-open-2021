import { Box, Button, Typography } from '@material-ui/core';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { addEntry, useStateValue } from '../state';
import { Entry, Patient } from '../types';
import EntryDetails from './EntryDetails';
import { Stack } from '@mui/material';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientDetailsPage = () => {
  const [{ diagnoses }, dispatch] = useStateValue();

  const { patientId } = useParams<{ patientId: string }>();

  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<Patient | null>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId as string}/entries`,
        values
      );
      dispatch(addEntry(patientId as string, newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  if (loading) {
    return <div>loading</div>;
  }

  if (!patient) {
    return <div>could not get patient</div>;
  }

  return (
    <Box>
      <Typography variant='h5'>
        {patient.name}
        {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography variant='h6'>entries</Typography>
      <Stack spacing={2}>
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
      </Stack>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant='contained' onClick={() => openModal()}>
        Add New Entry
      </Button>
    </Box>
  );
};

export default PatientDetailsPage;

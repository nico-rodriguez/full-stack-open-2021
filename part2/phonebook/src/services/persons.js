import axios from 'axios';

const baseURL = 'http://localhost:3001';

const getAll = () =>
  axios
    .get(`${baseURL}/persons`)
    .then(({ data }) => data);

const create = (person) =>
  axios
    .post(`${baseURL}/persons`, person)
    .then(({ data }) => data);

const put = (id, person) =>
  axios
    .put(`${baseURL}/persons/${id}`, person)
    .then(({data}) => data);

const remove = (id) =>
  axios
    .delete(`${baseURL}/persons/${id}`);


const personService = { getAll, create, put, remove };
export default personService;
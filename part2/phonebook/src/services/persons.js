import axios from 'axios';

const baseURL = '/api/persons';

const getAll = () =>
  axios
    .get(`${baseURL}`)
    .then(({ data }) => data);

const create = (person) =>
  axios
    .post(`${baseURL}`, person)
    .then(({ data }) => data);

const put = (id, person) =>
  axios
    .put(`${baseURL}/${id}`, person)
    .then(({data}) => data);

const remove = (id) =>
  axios
    .delete(`${baseURL}/${id}`);


const personService = { getAll, create, put, remove };
export default personService;
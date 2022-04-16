import axios from 'axios';

const baseUrl = '/api/users';

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const getOne = async (userId) => {
  const { data } = await axios.get(`${baseUrl}/${userId}`);
  return data;
};

export default { getAll, getOne };

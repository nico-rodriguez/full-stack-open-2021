import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
}

const create = async (title, author, url) => {
  const user = window.localStorage.getItem('user');
  const userToken = JSON.parse(user).token;

  const { data } = await axios.post(baseUrl, {
    title, author, url
  }, {
    headers: { 'Authorization': 'Bearer ' + userToken }
  });
  return data;
}

export default { getAll, create };
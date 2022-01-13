import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
}

export default { getAll };
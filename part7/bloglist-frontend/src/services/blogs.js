import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const getOne = async (blogId) => {
  const { data } = await axios.get(`${baseUrl}/${blogId}`);
  return data;
};

const create = async (title, author, url) => {
  const user = window.localStorage.getItem('user');
  const userToken = JSON.parse(user).token;

  const { data } = await axios.post(
    baseUrl,
    {
      title,
      author,
      url,
    },
    {
      headers: { Authorization: `Bearer ${userToken}` },
    }
  );
  return data;
};

const update = async (blogUpdate, blogId) => {
  const { data } = await axios.put(`${baseUrl}/${blogId}`, blogUpdate);
  return data;
};

const remove = async (blogId) => {
  const user = window.localStorage.getItem('user');
  const userToken = JSON.parse(user).token;

  await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
};

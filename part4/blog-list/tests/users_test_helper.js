const bcrypt = require('bcrypt');
const User = require('../models/user');

const initialUsersWithoutPassword = [
  {
    username: 'rambo',
    name: 'John Rambo'
  },
  {
    username: 'boyd',
    name: 'Malcolm Boyd'
  },
  {
    username: 'dumas',
    name: 'Alejandro Dumas'
  }
];

const initialUsers = Promise.all(['password1', 'password2', 'password3']
  .map((password) => bcrypt.hash(password, 10)))
  .then((passwordHashes) => passwordHashes.map((passwordHash, index) => ({
    ...initialUsersWithoutPassword[index], passwordHash
  })));

const nonExistingId = async () => {
  const saltRounds = 10;
  const password = 'password';
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: 'willberemovedsoon',
    name: 'name',
    password: passwordHash
  });
  await user.save();
  await user.remove();

  // eslint-disable-next-line no-underscore-dangle
  return user._id.toString();
};

const usersInDB = async () => {
  const users = await User.find({}).populate('blogs');
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialUsers,
  nonExistingId,
  usersInDB
};

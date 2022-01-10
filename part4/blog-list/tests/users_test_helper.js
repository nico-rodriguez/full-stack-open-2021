const bcrypt = require('bcrypt');
const User = require('../models/user');

const initialUsers = [
  {
    username: 'rambo',
    name: 'John Rambo',
    password: 'password1'
  },
  {
    username: 'boyd',
    name: 'Malcolm Boyd',
    password: 'password2'
  },
  {
    username: 'dumas',
    name: 'Alejandro Dumas',
    password: 'password3'
  },
];

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

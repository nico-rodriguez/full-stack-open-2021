const authorDef = require('./author.js');
const bookDef = require('./book.js');
const mutationDef = require('./mutation.js');
const tokenDef = require('./token.js');

const queryDef = require('./query.js');
const subscriptionDef = require('./subscription.js');
const userDef = require('./user.js');

module.exports = [
  authorDef,
  bookDef,
  mutationDef,
  tokenDef,
  queryDef,
  subscriptionDef,
  userDef,
];

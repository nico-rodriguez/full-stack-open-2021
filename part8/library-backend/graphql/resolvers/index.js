const merge = require('lodash.merge');

const authorResolver = require('./author.js');
const bookResolver = require('./book.js');
const userResolver = require('./user.js');

module.exports = merge(authorResolver, bookResolver, userResolver);

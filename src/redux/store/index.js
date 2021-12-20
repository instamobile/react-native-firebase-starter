/**
 * Redux store configuration.
 * Require and export different files for production and development.
 */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod')
} else {
  module.exports = require('./dev')
}

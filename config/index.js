/**
 * generate configuration according to environment
 */

const base = require('./config-base.js')

let config
if (process.env.NODE_ENV === 'production') {
  config = require('./config-prod.js')
} else {
  config = require('./config-dev.js')
}
config.env = process.env.NODE_ENV
// the dev or prod will cover base
const merge = Object.assign(base, config)
module.exports = merge

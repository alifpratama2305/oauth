//const newrelic = require('newrelic')
const logger = require('./logger')

function noticeError(err) {
  logger.error(err)
  //newrelic.noticeError(err)
}

module.exports = noticeError

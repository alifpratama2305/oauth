const Boom = require('boom')
const TAG = "server.service.error.basic"
const { logger } = require ('../../lib/reporter')

function withBasicError(code, msg) {
  return {
    error: {
      code,
      msg,
      recorded_at: new Date().toISOString()
    }
  }
}

function withRedirectError(code, msg, failedRedirectUrl) {
  logger.error(TAG, 'withRedirectError', code, msg, failedRedirectUrl)
  const basicErr = withBasicError(code, msg)
  basicErr.error.failed_redirect = failedRedirectUrl
  basicErr.error.redirect_time_in_seconds = 7
  return basicErr
}

function withBoom(statusCode, msg, data) {
  if (statusCode === 401) {
    logger.error(TAG, 'withBoom 401', statusCode, msg)
    return Boom.unauthorized(msg, data)
  }
  if (statusCode === 400) {
    logger.error(TAG, 'withBoom 400', statusCode, msg)
    return Boom.badRequest(msg, data)
  }
  if (statusCode === 409) {
    logger.error(TAG, 'withBoom 409', statusCode, msg)
    return Boom.conflict(msg, data)
  }
  logger.error(TAG, 'withBoom server busy', statusCode, msg)
  return Boom.serverUnavailable('Server is busy. Please try again')
}

module.exports = [
  {
    name: 'services.errors.basic',
    method: withBasicError
  },
  {
    name: 'services.errors.redirect',
    method: withRedirectError
  },
  {
    name: 'services.errors.boom',
    method: withBoom
  }
]

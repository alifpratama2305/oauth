const Joi = require('joi')
const handler = require('../handler/authorize')
//const schemas = require('../schemas/login')


const route = {
  method: 'GET',
  path: '/auth/authorize',
  options: {
    tags: ['api', 'auth'],
    description: 'Login API',
    notes: 'It will return access token and refresh token',
    validate: {
      options: {
        allowUnknown: true
      }
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          '200': {
            description: 'Success',
            //schema: schemas.loginResponse
          }
        }
      }
    },
    auth: false
  },
  handler
}

module.exports = route

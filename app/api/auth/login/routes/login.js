const Joi = require('joi')
const handler = require('../handler/login')
//const schemas = require('../schemas/login')


const route = {
  method: 'POST',
  path: '/auth/login',
  options: {
    tags: ['api', 'auth'],
    description: 'Login API',
    notes: 'It will return access token and refresh token',
    validate: {
      payload: {
        username: Joi.string().min(5).max(45).alphanum().required(),
        password: Joi.string().min(5).max(30).required()
      },
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

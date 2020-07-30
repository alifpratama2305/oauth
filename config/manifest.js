const Boom = require('boom')
const config = require('./index')
const model = require('../app/models/model')

const swaggerOptions = {
    info: {
        title: 'Portal Digital Bank API Documentation',
        version: config.version
    },
    documentationPath: '/docs'
}

const manifest = {
    server: {
        host: config.host,
        port: config.port,
        routes: {
            cors: true
        }
    },
    // state: {
    //   strictHeader: true,
    //   ignoreErrors: false,
    //   isSecure: true,
    //   isHttpOnly: true,
    //   isSameSite: 'Strict',
    //   encoding: 'none',
    // },
    register: {
        plugins: [
            {
                plugin: 'hapi-pino',
                options: {
                    prettyPrint: process.env.NODE_ENV !== 'production'
                }
            },
            { plugin: 'blipp' },
            { plugin: 'inert' },
            { plugin: 'vision' },
            {
                plugin: 'hapi-swagger',
                options: swaggerOptions
            },
            {
                plugin: 'hapi-oauth2-server-plugin',
                options: {
                    model: model
                }
            },
            {
                plugin: './services/auth-svc'
            },
            {
                plugin: './services/error-svc'
            },
            {
                plugin: './api',
                options: {
                    routes: {
                        prefix: '/api'
                    }
                }
            }
        ]
    }
}

module.exports = manifest
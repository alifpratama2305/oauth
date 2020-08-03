const config = require('../../config')
const { noticeError } = require('../lib/reporter');

const internals = {}

internals.plugin = {
    pkg: require('./package.json'),

    multiple: false,

    register: async (server, options) => {
        const preResponse = async (request, h) => {
            let { response } = request

            if (response.isBoom) {
            const code = response.output.statusCode
            const msg = response.data || response.message
            const err = request.server.methods.services.errors.basic(code, msg)
    
            // Fix for F5
            if (response.output.statusCode === 500 || response.output.statusCode === 503) {
                response.output.statusCode = 400
            }
    
            if(msg === 'Invalid request payload input'){
                request.logger.error('Invalid payload', {payload: request.payload})
            }
            noticeError(err);
    
            return h.response(err).code(response.output.statusCode)
            }

            if(request.path != "/docs"){
            response.header("X-XSS-Protection", "1; mode=block");
            // response.header("Content-Type", "application/x-www-form-urlencoded")
            response.header("X-Frame-Options", "SAMEORIGIN");
            response.header("X-Content-Type-Options", "nosniff");
            response.header("Strict-Transport-Security", "max-age=16070400; includeSubDomains" );
            response.header("Referrer-Policy", "no-referrer");
            response.header("Feature-Policy", "vibrate 'none'; geolocation 'none'");
            h.state('TS015c3a15');
            }
    
            return h.continue
        }
        await server.register(require('hapi-auth-jwt2'))

        server.auth.strategy('portal-web-jwt', 'jwt', {
        key: config.portalWebClientPublicKey,
        validate: async function (decoded, request) {
                // See https://github.com/dwyl/hapi-auth-jwt2
                // provides checking for invalidated token after user logout
            
                request.auth.decoded = decoded
                // const introspect = await request.server.methods.services.auth.introspect(request.auth.token)
                return { isValid: true/*introspect.body.active*/, credentials: decoded }
            },
            verifyOptions: { algorithms: ['RS256'] }
        })

        server.auth.default('portal-web-jwt')

        await [
            server.register(require('./auth/login'))
        ]

        server.ext('onPreResponse', preResponse)

        server.route({
            method: 'GET',
            path: '/status',
            config: {
              description: 'Status endpoint',
              notes: 'Return service current status',
              tags: ['api', 'status']
            },
            handler: (request, h) => {
              return { status: 'up' }
            }
        })
    }
}

module.exports = internals
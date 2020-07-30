require('dotenv-flow').config()

const Glue = require('glue')
const config = require('./config')
const manifest = require('./config/manifest')

const poolAgroIBDuplicate = require('./app/lib/db/agroIBDuplicate').pool

let options = {
    relativeTo: process.cwd() + '/app'
}

const startServer = async function () {
    try {
        const server = await Glue.compose(manifest, options)
        server.listener.keepAliveTimeout = 60000
        await server.start()
        
        const closeConn = function() {
            poolAgroIBDuplicate.end(() => {
                console.log('pool agro ib duplicate has ended')
            })
        }
        process.on('SIGTERM', closeConn)
        process.on('SIGINT', closeConn)

        console.log('Digital Bank Delivery')
        console.log('Portal Digital Bank API - Server Starts on', `${config.host}:${config.port}`)
    }
    catch(err) {
        console.error(err)
        process.exit(1)
    }
}

startServer()
function routes (server) {
    server.route(require('./authenticate'))
    server.route(require('./authorize'))
    server.route(require('./token'))
  
    return server
  }
  
  module.exports = routes
  
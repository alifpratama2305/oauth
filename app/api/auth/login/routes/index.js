function routes (server) {
    server.route(require('./login'))
  
    return server
  }
  
  module.exports = routes
  

exports.plugin = {
    pkg: require('./package.json'),
  
    multiple: false,
  
    register: (server, options) => {
      const services = [].concat(
        require('./authenticate'),
        require('./authorize'),
        require('./token')
      )
      server.method(services)
    }
  }
  
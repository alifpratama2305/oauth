const Routes = require('./routes')

exports.plugin = {
  pkg: require('./package.json'),

  register: (server, options) => {
    Routes(server)
  }
}
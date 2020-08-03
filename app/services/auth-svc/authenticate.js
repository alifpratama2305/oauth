async function authenticate(req, h) {
    const { oauth } = req.server.plugins['hapi-oauth2-server-plugin']
    console.log({oauth})
    try {
      return await oauth.authenticate(req)
    } catch (e) {
      console.log(e)
      return h.response().code(401)
    }
}

module.exports = {
    name: 'services.auth.authenticate',
    method: authenticate
}
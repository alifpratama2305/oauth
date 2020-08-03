async function token(req, h) {
    const { oauth } = req.server.plugins['hapi-oauth2-server-plugin']
    try {
      return await oauth.token(req)
    } catch (e) {
      console.log(e)
      return h.response().code(401)
    }
}

module.exports = {
    name: 'services.auth.token',
    method: token
}
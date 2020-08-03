

async function token (req, h) {
    const tokenData = await req.server.methods.services.auth.token(req, h)

    return tokenData
  }

  module.exports = token
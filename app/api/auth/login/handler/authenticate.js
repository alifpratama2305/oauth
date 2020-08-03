

async function authenticate (req, h) {
    const authenticateData = await req.server.methods.services.auth.authenticate(req, h)

    return authenticateData
  }

  module.exports = authenticate


async function authorize (req, h) {
    const authorizeData = await req.server.methods.services.auth.authorize(req, h)

    return authorizeData
  }

  module.exports = authorize
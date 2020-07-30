
async function login(req, res) {
    console.log({res})
    //res.request.headers('content-type', 'application/x-www-form-urlencoded')
    
    const { username, password } = req.payload
    
    let response = req.raw.res

    response.setHeader('content-type', 'application/x-www-form-urlencoded')

    const loginData = await req.server.methods.services.auth.authenticate(req, res)
    console.log({loginData})
    return { loginData }
  }
  
  module.exports = login
  
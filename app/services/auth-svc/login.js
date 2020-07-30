
async function authenticate(req, res) {
	console.log({req}, '333')
	console.log({res}, '444')
	const { oauth } = req.server.plugins['hapi-oauth2-server-plugin']
	console.log(oauth.token.toString())
	return oauth.token(req, res)
		.then(function(token) {
			
			res.json(token);
		}).catch(function(err) {
			console.log({err})
		});
}

module.exports = [
    {
        name: 'services.auth.authenticate',
        method: authenticate
    }
]
const { parse } = require('url');
const axios = require('axios')
const { client_id, client_secret } = require('../config');
const qs = require('qs');

exports.mal = (req, res, next) => {
  const { code, code_verifier } = parse(req.url, true).query;
  const postBaseUrl = 'https://myanimelist.net/v1/oauth2/token'
  const data = qs.stringify({
    client_id: client_id,
    client_secret: client_secret,
    code: code,
    code_verifier: code_verifier,
    grant_type: 'authorization_code'
  })
  axios({
    method: 'POST',
    url: postBaseUrl,
    data: data,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).then((response) => {
    return res.send(response.data)
  }).catch((error) => {
    return res.status(400).json({ error })
  })
}

const allowedCors = [
  'https://api.a.zhadnov.nomoredomains.monster',
  'http://api.a.zhadnov.nomoredomains.monster',
  'https://a.zhadnov.nomoredomains.monster',
  'http://a.zhadnov.nomoredomains.monster',
  'https://localhost:3000',
  'http://localhost:3000',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = { cors };

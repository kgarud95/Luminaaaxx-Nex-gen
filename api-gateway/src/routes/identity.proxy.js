const { createProxyMiddleware } = require('http-proxy-middleware');

const identityServices = {
  auth: 'http://localhost:3001',
  authorization: 'http://localhost:3002',
  userProfile: 'http://localhost:3003',
  sessionManagement: 'http://localhost:3004',
  oauthProvider: 'http://localhost:3005',
  identityVerification: 'http://localhost:3006',
  accountRecovery: 'http://localhost:3007',
  auditLogging: 'http://localhost:3008'
};

const createIdentityProxy = (target, pathRewrite) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite,
    onError: (err, req, res) => {
      console.error(`Identity service error (${target}):`, err.message);
      res.status(503).json({ 
        error: 'Identity service unavailable',
        service: target 
      });
    }
  });
};

module.exports = {
  auth: createIdentityProxy(identityServices.auth, { '^/api/auth': '/api/auth' }),
  authorization: createIdentityProxy(identityServices.authorization, { '^/api/authorization': '/api/authorization' }),
  userProfile: createIdentityProxy(identityServices.userProfile, { '^/api/users': '/api/users' }),
  sessionManagement: createIdentityProxy(identityServices.sessionManagement, { '^/api/sessions': '/api/sessions' }),
  oauthProvider: createIdentityProxy(identityServices.oauthProvider, { '^/api/oauth': '/api/oauth' }),
  identityVerification: createIdentityProxy(identityServices.identityVerification, { '^/api/verification': '/api/verification' }),
  accountRecovery: createIdentityProxy(identityServices.accountRecovery, { '^/api/recovery': '/api/recovery' }),
  auditLogging: createIdentityProxy(identityServices.auditLogging, { '^/api/audit': '/api/audit' })
};
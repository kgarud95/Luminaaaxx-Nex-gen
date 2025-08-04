const { createProxyMiddleware } = require('http-proxy-middleware');

const commerceServices = {
  pricing: 'http://localhost:3031',
  paymentProcessing: 'http://localhost:3032',
  subscription: 'http://localhost:3033',
  invoice: 'http://localhost:3034',
  refund: 'http://localhost:3035',
  financialReporting: 'http://localhost:3036',
  coupon: 'http://localhost:3037',
  revenueAnalytics: 'http://localhost:3038'
};

const createCommerceProxy = (target, pathRewrite) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite,
    onError: (err, req, res) => {
      console.error(`Commerce service error (${target}):`, err.message);
      res.status(503).json({ 
        error: 'Commerce service unavailable',
        service: target 
      });
    }
  });
};

module.exports = {
  pricing: createCommerceProxy(commerceServices.pricing, { '^/api/pricing': '/api/pricing' }),
  paymentProcessing: createCommerceProxy(commerceServices.paymentProcessing, { '^/api/payments': '/api/payments' }),
  subscription: createCommerceProxy(commerceServices.subscription, { '^/api/subscriptions': '/api/subscriptions' }),
  invoice: createCommerceProxy(commerceServices.invoice, { '^/api/invoices': '/api/invoices' }),
  refund: createCommerceProxy(commerceServices.refund, { '^/api/refunds': '/api/refunds' }),
  financialReporting: createCommerceProxy(commerceServices.financialReporting, { '^/api/financial-reports': '/api/financial-reports' }),
  coupon: createCommerceProxy(commerceServices.coupon, { '^/api/coupons': '/api/coupons' }),
  revenueAnalytics: createCommerceProxy(commerceServices.revenueAnalytics, { '^/api/revenue-analytics': '/api/revenue-analytics' })
};
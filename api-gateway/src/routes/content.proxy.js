const { createProxyMiddleware } = require('http-proxy-middleware');

const contentServices = {
  courseCatalog: 'http://localhost:3011',
  lessonContent: 'http://localhost:3012',
  videoProcessing: 'http://localhost:3013',
  fileStorage: 'http://localhost:3014',
  contentVersioning: 'http://localhost:3015',
  metadata: 'http://localhost:3016',
  contentModeration: 'http://localhost:3017',
  mediaStreaming: 'http://localhost:3018',
  contentSearch: 'http://localhost:3019',
  contentAnalytics: 'http://localhost:3020'
};

const createContentProxy = (target, pathRewrite) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite,
    onError: (err, req, res) => {
      console.error(`Content service error (${target}):`, err.message);
      res.status(503).json({ 
        error: 'Content service unavailable',
        service: target 
      });
    }
  });
};

module.exports = {
  courseCatalog: createContentProxy(contentServices.courseCatalog, { '^/api/courses': '/api/courses' }),
  lessonContent: createContentProxy(contentServices.lessonContent, { '^/api/lessons': '/api/lessons' }),
  videoProcessing: createContentProxy(contentServices.videoProcessing, { '^/api/video': '/api/video' }),
  fileStorage: createContentProxy(contentServices.fileStorage, { '^/api/files': '/api/files' }),
  contentVersioning: createContentProxy(contentServices.contentVersioning, { '^/api/versions': '/api/versions' }),
  metadata: createContentProxy(contentServices.metadata, { '^/api/metadata': '/api/metadata' }),
  contentModeration: createContentProxy(contentServices.contentModeration, { '^/api/moderation': '/api/moderation' }),
  mediaStreaming: createContentProxy(contentServices.mediaStreaming, { '^/api/streaming': '/api/streaming' }),
  contentSearch: createContentProxy(contentServices.contentSearch, { '^/api/search': '/api/search' }),
  contentAnalytics: createContentProxy(contentServices.contentAnalytics, { '^/api/content-analytics': '/api/content-analytics' })
};
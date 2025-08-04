const { createProxyMiddleware } = require('http-proxy-middleware');

const learningServices = {
  progressTracking: 'http://localhost:3021',
  quizEngine: 'http://localhost:3022',
  certificate: 'http://localhost:3023',
  learningPath: 'http://localhost:3024',
  gamification: 'http://localhost:3025',
  studyAnalytics: 'http://localhost:3026',
  assignment: 'http://localhost:3027',
  discussionForum: 'http://localhost:3028',
  liveSession: 'http://localhost:3029'
};

const createLearningProxy = (target, pathRewrite) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite,
    onError: (err, req, res) => {
      console.error(`Learning service error (${target}):`, err.message);
      res.status(503).json({ 
        error: 'Learning service unavailable',
        service: target 
      });
    }
  });
};

module.exports = {
  progressTracking: createLearningProxy(learningServices.progressTracking, { '^/api/progress': '/api/progress' }),
  quizEngine: createLearningProxy(learningServices.quizEngine, { '^/api/quizzes': '/api/quizzes' }),
  certificate: createLearningProxy(learningServices.certificate, { '^/api/certificates': '/api/certificates' }),
  learningPath: createLearningProxy(learningServices.learningPath, { '^/api/learning-paths': '/api/learning-paths' }),
  gamification: createLearningProxy(learningServices.gamification, { '^/api/gamification': '/api/gamification' }),
  studyAnalytics: createLearningProxy(learningServices.studyAnalytics, { '^/api/study-analytics': '/api/study-analytics' }),
  assignment: createLearningProxy(learningServices.assignment, { '^/api/assignments': '/api/assignments' }),
  discussionForum: createLearningProxy(learningServices.discussionForum, { '^/api/discussions': '/api/discussions' }),
  liveSession: createLearningProxy(learningServices.liveSession, { '^/api/live-sessions': '/api/live-sessions' })
};
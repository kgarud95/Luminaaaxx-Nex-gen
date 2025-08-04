const express = require('express');
const progressController = require('../controllers/progress.controller');

const router = express.Router();

// Progress tracking routes
router.post('/enroll', progressController.enrollUser);
router.post('/lesson', progressController.updateLessonProgress);
router.get('/user/:userId', progressController.getUserProgress);
router.get('/user/:userId/course/:courseId', progressController.getCourseProgress);
router.get('/user/:userId/stats', progressController.getProgressStats);

module.exports = router;
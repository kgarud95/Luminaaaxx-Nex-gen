const express = require('express');
const courseController = require('../controllers/course.controller');

const router = express.Router();

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/categories', courseController.getCategories);
router.get('/popular', courseController.getPopularCourses);
router.get('/featured', courseController.getFeaturedCourses);
router.get('/:id', courseController.getCourseById);

// Protected routes (require authentication)
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
const Joi = require('joi');
const Course = require('../models/Course');

// Validation schemas
const createCourseSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  description: Joi.string().min(10).max(1000).required(),
  category: Joi.string().required(),
  level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').required(),
  price: Joi.number().min(0).required(),
  duration: Joi.string().required(),
  lessons: Joi.number().min(1).required(),
  thumbnail: Joi.string().uri().optional(),
  instructor: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    title: Joi.string().required(),
    avatar: Joi.string().uri().optional(),
    bio: Joi.string().optional()
  }).required()
});

const updateCourseSchema = Joi.object({
  title: Joi.string().min(5).max(200),
  description: Joi.string().min(10).max(1000),
  category: Joi.string(),
  level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced'),
  price: Joi.number().min(0),
  duration: Joi.string(),
  lessons: Joi.number().min(1),
  thumbnail: Joi.string().uri(),
  status: Joi.string().valid('draft', 'published', 'archived')
});

class CourseController {
  async getAllCourses(req, res) {
    try {
      const { category, level, search, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
      
      const filters = {
        category,
        level,
        search,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined
      };

      const courses = Course.getAll(filters);
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedCourses = courses.slice(startIndex, endIndex);

      res.status(200).json({
        courses: paginatedCourses,
        pagination: {
          total: courses.length,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(courses.length / limit)
        }
      });

    } catch (error) {
      console.error('Get all courses error:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  }

  async getCourseById(req, res) {
    try {
      const { id } = req.params;
      const course = Course.findById(id);

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(200).json(course);

    } catch (error) {
      console.error('Get course by ID error:', error);
      res.status(500).json({ error: 'Failed to fetch course' });
    }
  }

  async createCourse(req, res) {
    try {
      const { error } = createCourseSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.details[0].message
        });
      }

      const newCourse = Course.create(req.body);
      res.status(201).json(newCourse);

    } catch (error) {
      console.error('Create course error:', error);
      res.status(500).json({ error: 'Failed to create course' });
    }
  }

  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      
      const { error } = updateCourseSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.details[0].message
        });
      }

      const updatedCourse = Course.update(id, req.body);
      
      if (!updatedCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(200).json(updatedCourse);

    } catch (error) {
      console.error('Update course error:', error);
      res.status(500).json({ error: 'Failed to update course' });
    }
  }

  async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      const deleted = Course.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(200).json({ message: 'Course deleted successfully' });

    } catch (error) {
      console.error('Delete course error:', error);
      res.status(500).json({ error: 'Failed to delete course' });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = Course.getCategories();
      res.status(200).json({ categories });

    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }

  async getPopularCourses(req, res) {
    try {
      const { limit = 10 } = req.query;
      const popularCourses = Course.getPopular(parseInt(limit));
      
      res.status(200).json({ courses: popularCourses });

    } catch (error) {
      console.error('Get popular courses error:', error);
      res.status(500).json({ error: 'Failed to fetch popular courses' });
    }
  }

  async getFeaturedCourses(req, res) {
    try {
      const { limit = 6 } = req.query;
      const featuredCourses = Course.getFeatured(parseInt(limit));
      
      res.status(200).json({ courses: featuredCourses });

    } catch (error) {
      console.error('Get featured courses error:', error);
      res.status(500).json({ error: 'Failed to fetch featured courses' });
    }
  }
}

module.exports = new CourseController();
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

// Mock progress database
class ProgressDatabase {
  constructor() {
    this.enrollments = [];
    this.lessonProgress = [];
    this.courseProgress = [];
  }

  createEnrollment(enrollmentData) {
    const enrollment = {
      id: uuidv4(),
      ...enrollmentData,
      enrolledAt: new Date(),
      lastAccessedAt: new Date(),
      progress: 0,
      completedLessons: 0,
      status: 'active'
    };
    this.enrollments.push(enrollment);
    return enrollment;
  }

  updateLessonProgress(userId, courseId, lessonId, progressData) {
    const existingProgress = this.lessonProgress.find(
      p => p.userId === userId && p.courseId === courseId && p.lessonId === lessonId
    );

    if (existingProgress) {
      Object.assign(existingProgress, progressData, { updatedAt: new Date() });
      return existingProgress;
    } else {
      const newProgress = {
        id: uuidv4(),
        userId,
        courseId,
        lessonId,
        ...progressData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.lessonProgress.push(newProgress);
      return newProgress;
    }
  }

  getUserEnrollments(userId) {
    return this.enrollments.filter(e => e.userId === userId);
  }

  getCourseProgress(userId, courseId) {
    return this.lessonProgress.filter(p => p.userId === userId && p.courseId === courseId);
  }

  updateCourseProgress(userId, courseId) {
    const lessonProgresses = this.getCourseProgress(userId, courseId);
    const completedLessons = lessonProgresses.filter(p => p.completed).length;
    const totalLessons = lessonProgresses.length;
    const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    const enrollment = this.enrollments.find(e => e.userId === userId && e.courseId === courseId);
    if (enrollment) {
      enrollment.progress = Math.round(overallProgress);
      enrollment.completedLessons = completedLessons;
      enrollment.lastAccessedAt = new Date();
      
      if (overallProgress === 100) {
        enrollment.status = 'completed';
        enrollment.completedAt = new Date();
      }
    }

    return enrollment;
  }
}

const progressDB = new ProgressDatabase();

// Add some mock data
progressDB.createEnrollment({
  userId: '1',
  courseId: '1',
  courseName: 'Complete Python Programming Bootcamp'
});

progressDB.createEnrollment({
  userId: '1',
  courseId: '2',
  courseName: 'Machine Learning with TensorFlow'
});

// Validation schemas
const enrollmentSchema = Joi.object({
  userId: Joi.string().required(),
  courseId: Joi.string().required(),
  courseName: Joi.string().required()
});

const lessonProgressSchema = Joi.object({
  userId: Joi.string().required(),
  courseId: Joi.string().required(),
  lessonId: Joi.string().required(),
  completed: Joi.boolean().default(false),
  timeSpent: Joi.number().min(0).default(0),
  watchTime: Joi.number().min(0).default(0),
  score: Joi.number().min(0).max(100).optional()
});

class ProgressController {
  async enrollUser(req, res) {
    try {
      const { error } = enrollmentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.details[0].message
        });
      }

      const { userId, courseId, courseName } = req.body;

      // Check if already enrolled
      const existingEnrollment = progressDB.enrollments.find(
        e => e.userId === userId && e.courseId === courseId
      );

      if (existingEnrollment) {
        return res.status(409).json({ 
          error: 'User already enrolled in this course',
          enrollment: existingEnrollment
        });
      }

      const enrollment = progressDB.createEnrollment({ userId, courseId, courseName });

      res.status(201).json({
        enrollment,
        message: 'User enrolled successfully'
      });

    } catch (error) {
      console.error('Enroll user error:', error);
      res.status(500).json({ error: 'Failed to enroll user' });
    }
  }

  async updateLessonProgress(req, res) {
    try {
      const { error } = lessonProgressSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.details[0].message
        });
      }

      const { userId, courseId, lessonId, completed, timeSpent, watchTime, score } = req.body;

      // Update lesson progress
      const lessonProgress = progressDB.updateLessonProgress(userId, courseId, lessonId, {
        completed,
        timeSpent,
        watchTime,
        score
      });

      // Update overall course progress
      const courseProgress = progressDB.updateCourseProgress(userId, courseId);

      res.status(200).json({
        lessonProgress,
        courseProgress,
        message: 'Progress updated successfully'
      });

    } catch (error) {
      console.error('Update lesson progress error:', error);
      res.status(500).json({ error: 'Failed to update progress' });
    }
  }

  async getUserProgress(req, res) {
    try {
      const { userId } = req.params;
      const enrollments = progressDB.getUserEnrollments(userId);

      // Get detailed progress for each enrollment
      const detailedProgress = enrollments.map(enrollment => {
        const lessonProgresses = progressDB.getCourseProgress(userId, enrollment.courseId);
        return {
          ...enrollment,
          lessons: lessonProgresses
        };
      });

      res.status(200).json({
        enrollments: detailedProgress,
        totalEnrollments: enrollments.length,
        completedCourses: enrollments.filter(e => e.status === 'completed').length
      });

    } catch (error) {
      console.error('Get user progress error:', error);
      res.status(500).json({ error: 'Failed to get user progress' });
    }
  }

  async getCourseProgress(req, res) {
    try {
      const { userId, courseId } = req.params;
      
      const enrollment = progressDB.enrollments.find(
        e => e.userId === userId && e.courseId === courseId
      );

      if (!enrollment) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }

      const lessonProgresses = progressDB.getCourseProgress(userId, courseId);

      res.status(200).json({
        enrollment,
        lessons: lessonProgresses,
        summary: {
          totalLessons: lessonProgresses.length,
          completedLessons: lessonProgresses.filter(l => l.completed).length,
          totalTimeSpent: lessonProgresses.reduce((sum, l) => sum + (l.timeSpent || 0), 0),
          averageScore: lessonProgresses.filter(l => l.score).length > 0 
            ? lessonProgresses.reduce((sum, l) => sum + (l.score || 0), 0) / lessonProgresses.filter(l => l.score).length
            : null
        }
      });

    } catch (error) {
      console.error('Get course progress error:', error);
      res.status(500).json({ error: 'Failed to get course progress' });
    }
  }

  async getProgressStats(req, res) {
    try {
      const { userId } = req.params;
      const enrollments = progressDB.getUserEnrollments(userId);
      const allLessonProgress = progressDB.lessonProgress.filter(p => p.userId === userId);

      const stats = {
        totalEnrollments: enrollments.length,
        activeEnrollments: enrollments.filter(e => e.status === 'active').length,
        completedCourses: enrollments.filter(e => e.status === 'completed').length,
        totalLessonsCompleted: allLessonProgress.filter(p => p.completed).length,
        totalTimeSpent: allLessonProgress.reduce((sum, p) => sum + (p.timeSpent || 0), 0),
        averageProgress: enrollments.length > 0 
          ? enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length
          : 0,
        streakDays: Math.floor(Math.random() * 30) + 1, // Mock streak
        certificatesEarned: enrollments.filter(e => e.status === 'completed').length
      };

      res.status(200).json({ stats });

    } catch (error) {
      console.error('Get progress stats error:', error);
      res.status(500).json({ error: 'Failed to get progress stats' });
    }
  }
}

module.exports = new ProgressController();
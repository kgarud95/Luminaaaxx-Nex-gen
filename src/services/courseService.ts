import axios from 'axios';
import { Course, EnrolledCourse } from '../types/course';

const API_BASE_URL = 'http://localhost:3000/api';

class CourseService {
  private mockCourses: Course[] = [
    {
      id: '1',
      title: 'Complete Python Programming Bootcamp',
      description: 'Learn Python from beginner to advanced level with hands-on projects and real-world applications.',
      fullDescription: 'This comprehensive Python course covers everything from basic syntax to advanced topics like web development, data science, and machine learning. You\'ll build real projects and gain practical experience.',
      category: 'Programming',
      level: 'Beginner',
      price: 89.99,
      rating: 4.8,
      reviews: 12547,
      students: 45623,
      duration: '40 hours',
      lessons: 120,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      instructor: {
        id: '1',
        name: 'Dr. Sarah Johnson',
        title: 'Senior Software Engineer at Google',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        bio: 'Dr. Sarah Johnson is a senior software engineer at Google with over 10 years of experience in Python development. She has taught thousands of students and is passionate about making programming accessible to everyone.'
      },
      learningObjectives: [
        'Master Python fundamentals and advanced concepts',
        'Build real-world applications and projects',
        'Understand object-oriented programming',
        'Work with databases and APIs',
        'Deploy applications to the cloud'
      ],
      prerequisites: [
        'Basic computer skills',
        'No programming experience required',
        'Computer with internet connection'
      ],
      modules: [
        {
          id: '1',
          title: 'Python Basics',
          duration: '8 hours',
          lessons: [
            { id: '1', title: 'Introduction to Python', duration: '45 min' },
            { id: '2', title: 'Variables and Data Types', duration: '60 min' },
            { id: '3', title: 'Control Flow', duration: '75 min' }
          ]
        }
      ],
      reviewsData: [
        {
          id: '1',
          name: 'Mike Chen',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          rating: 5,
          comment: 'Excellent course! Very comprehensive and well-structured.',
          date: '2 weeks ago'
        }
      ]
    },
    {
      id: '2',
      title: 'Machine Learning with TensorFlow',
      description: 'Master machine learning and deep learning using TensorFlow and Python.',
      category: 'Data Science',
      level: 'Intermediate',
      price: 129.99,
      rating: 4.9,
      reviews: 8934,
      students: 23457,
      duration: '55 hours',
      lessons: 95,
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      instructor: {
        id: '2',
        name: 'Prof. Alex Kim',
        title: 'AI Research Scientist',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        bio: 'Professor Alex Kim is an AI research scientist with expertise in machine learning and neural networks.'
      },
      learningObjectives: [
        'Understand machine learning algorithms',
        'Build neural networks with TensorFlow',
        'Work with real datasets',
        'Deploy ML models to production'
      ],
      prerequisites: [
        'Basic Python knowledge',
        'High school mathematics',
        'Understanding of statistics'
      ]
    },
    {
      id: '3',
      title: 'UI/UX Design Masterclass',
      description: 'Learn modern UI/UX design principles and create stunning user interfaces.',
      category: 'Design',
      level: 'Beginner',
      price: 79.99,
      rating: 4.7,
      reviews: 15623,
      students: 67890,
      duration: '35 hours',
      lessons: 80,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      instructor: {
        id: '3',
        name: 'Emily Rodriguez',
        title: 'Senior UX Designer at Apple',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        bio: 'Emily Rodriguez is a senior UX designer at Apple with a passion for creating beautiful and functional user experiences.'
      },
      learningObjectives: [
        'Master design principles and theory',
        'Create wireframes and prototypes',
        'Conduct user research',
        'Design for mobile and web'
      ],
      prerequisites: [
        'Basic computer skills',
        'Interest in design',
        'No prior experience required'
      ]
    }
  ];

  async getAllCourses(): Promise<Course[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses`);
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return this.mockCourses;
    }
  }

  async getCourseById(id: string): Promise<Course | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses/${id}`);
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return this.mockCourses.find(course => course.id === id) || null;
    }
  }

  async enrollInCourse(courseId: string, userId: string): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/enrollments`, {
        courseId,
        userId
      });
    } catch (error) {
      // Mock enrollment success
      console.log(`Enrolled user ${userId} in course ${courseId}`);
    }
  }

  async checkEnrollment(courseId: string, userId: string): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/enrollments/${userId}/${courseId}`);
      return response.data.enrolled;
    } catch (error) {
      // Mock enrollment check
      return Math.random() > 0.5; // Random enrollment status for demo
    }
  }

  async getEnrolledCourses(userId: string): Promise<EnrolledCourse[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/enrollments`);
      return response.data;
    } catch (error) {
      // Return mock enrolled courses
      return this.mockCourses.slice(0, 2).map(course => ({
        ...course,
        progress: Math.floor(Math.random() * 100),
        lastAccessed: new Date().toISOString(),
        completedLessons: Math.floor(Math.random() * course.lessons)
      }));
    }
  }
}

export const courseService = new CourseService();
const { v4: uuidv4 } = require('uuid');

class Course {
  constructor() {
    this.courses = [
      {
        id: '1',
        title: 'Complete Python Programming Bootcamp',
        description: 'Learn Python from beginner to advanced level with hands-on projects and real-world applications.',
        fullDescription: 'This comprehensive Python course covers everything from basic syntax to advanced topics like web development, data science, and machine learning. You\'ll build real projects and gain practical experience that will help you land your dream job in tech.',
        category: 'Programming',
        level: 'Beginner',
        price: 89.99,
        rating: 4.8,
        reviews: 12547,
        students: 45623,
        duration: '40 hours',
        lessons: 120,
        thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        status: 'published',
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
          'Deploy applications to the cloud',
          'Write clean, maintainable code'
        ],
        prerequisites: [
          'Basic computer skills',
          'No programming experience required',
          'Computer with internet connection',
          'Willingness to learn and practice'
        ],
        modules: [
          {
            id: '1',
            title: 'Python Basics',
            duration: '8 hours',
            lessons: [
              { id: '1', title: 'Introduction to Python', duration: '45 min' },
              { id: '2', title: 'Variables and Data Types', duration: '60 min' },
              { id: '3', title: 'Control Flow', duration: '75 min' },
              { id: '4', title: 'Functions', duration: '90 min' }
            ]
          },
          {
            id: '2',
            title: 'Object-Oriented Programming',
            duration: '12 hours',
            lessons: [
              { id: '5', title: 'Classes and Objects', duration: '60 min' },
              { id: '6', title: 'Inheritance', duration: '45 min' },
              { id: '7', title: 'Polymorphism', duration: '50 min' }
            ]
          }
        ],
        reviewsData: [
          {
            id: '1',
            name: 'Mike Chen',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            rating: 5,
            comment: 'Excellent course! Very comprehensive and well-structured. The instructor explains complex concepts in a simple way.',
            date: '2 weeks ago'
          },
          {
            id: '2',
            name: 'Anna Rodriguez',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            rating: 5,
            comment: 'This course helped me transition into a Python developer role. Highly recommended!',
            date: '1 month ago'
          }
        ],
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Machine Learning with TensorFlow',
        description: 'Master machine learning and deep learning using TensorFlow and Python.',
        fullDescription: 'Dive deep into machine learning with this comprehensive course covering supervised learning, unsupervised learning, neural networks, and deep learning using TensorFlow. Build real-world ML applications.',
        category: 'Data Science',
        level: 'Intermediate',
        price: 129.99,
        rating: 4.9,
        reviews: 8934,
        students: 23457,
        duration: '55 hours',
        lessons: 95,
        thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        status: 'published',
        instructor: {
          id: '2',
          name: 'Prof. Alex Kim',
          title: 'AI Research Scientist at Stanford',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          bio: 'Professor Alex Kim is an AI research scientist with expertise in machine learning and neural networks. He has published over 50 research papers and worked on cutting-edge AI projects.'
        },
        learningObjectives: [
          'Understand machine learning algorithms',
          'Build neural networks with TensorFlow',
          'Work with real datasets',
          'Deploy ML models to production',
          'Implement deep learning architectures'
        ],
        prerequisites: [
          'Basic Python knowledge',
          'High school mathematics',
          'Understanding of statistics',
          'Linear algebra basics'
        ],
        reviewsData: [
          {
            id: '1',
            name: 'David Wilson',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            rating: 5,
            comment: 'Amazing course! The practical examples and hands-on projects really helped me understand ML concepts.',
            date: '1 week ago'
          }
        ]
      },
      {
        id: '3',
        title: 'UI/UX Design Masterclass',
        description: 'Learn modern UI/UX design principles and create stunning user interfaces.',
        fullDescription: 'Master the art of UI/UX design with this comprehensive course. Learn design thinking, user research, wireframing, prototyping, and creating beautiful user interfaces that users love.',
        category: 'Design',
        level: 'Beginner',
        price: 79.99,
        rating: 4.7,
        reviews: 15623,
        students: 67890,
        duration: '35 hours',
        lessons: 80,
        thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        status: 'published',
        instructor: {
          id: '3',
          name: 'Emily Rodriguez',
          title: 'Senior UX Designer at Apple',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          bio: 'Emily Rodriguez is a senior UX designer at Apple with a passion for creating beautiful and functional user experiences. She has designed award-winning interfaces for mobile and web applications.'
        },
        learningObjectives: [
          'Master design principles and theory',
          'Create wireframes and prototypes',
          'Conduct user research',
          'Design for mobile and web',
          'Use design tools like Figma and Sketch'
        ],
        prerequisites: [
          'Basic computer skills',
          'Interest in design',
          'No prior experience required',
          'Creative mindset'
        ],
        reviewsData: [
          {
            id: '1',
            name: 'Sophie Miller',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            rating: 5,
            comment: 'Perfect course for beginners! Emily explains everything clearly and the projects are very practical.',
            date: '3 days ago'
          }
        ]
      },
      {
        id: '4',
        title: 'React.js Complete Guide',
        description: 'Build modern web applications with React.js from scratch.',
        category: 'Programming',
        level: 'Intermediate',
        price: 99.99,
        rating: 4.8,
        reviews: 9876,
        students: 34567,
        duration: '45 hours',
        lessons: 110,
        thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        status: 'published',
        instructor: {
          id: '4',
          name: 'John Developer',
          title: 'Full Stack Developer at Netflix',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          bio: 'John is a full-stack developer with 8 years of experience building scalable web applications.'
        },
        learningObjectives: [
          'Master React fundamentals',
          'Build complex applications',
          'State management with Redux',
          'Testing React applications'
        ],
        prerequisites: [
          'JavaScript knowledge',
          'HTML/CSS basics',
          'ES6+ features understanding'
        ]
      },
      {
        id: '5',
        title: 'Digital Marketing Mastery',
        description: 'Learn comprehensive digital marketing strategies and tactics.',
        category: 'Marketing',
        level: 'Beginner',
        price: 69.99,
        rating: 4.6,
        reviews: 7543,
        students: 28901,
        duration: '30 hours',
        lessons: 75,
        thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        status: 'published',
        instructor: {
          id: '5',
          name: 'Maria Gonzalez',
          title: 'Digital Marketing Director',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          bio: 'Maria has over 12 years of experience in digital marketing and has helped numerous businesses grow online.'
        },
        learningObjectives: [
          'SEO and SEM strategies',
          'Social media marketing',
          'Content marketing',
          'Email marketing campaigns'
        ],
        prerequisites: [
          'Basic computer skills',
          'Interest in marketing',
          'No prior experience required'
        ]
      }
    ];
  }

  getAll(filters = {}) {
    let filteredCourses = [...this.courses];

    if (filters.category) {
      filteredCourses = filteredCourses.filter(course => 
        course.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.level) {
      filteredCourses = filteredCourses.filter(course => 
        course.level.toLowerCase() === filters.level.toLowerCase()
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredCourses = filteredCourses.filter(course => 
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.minPrice || filters.maxPrice) {
      filteredCourses = filteredCourses.filter(course => {
        const price = course.price;
        if (filters.minPrice && price < filters.minPrice) return false;
        if (filters.maxPrice && price > filters.maxPrice) return false;
        return true;
      });
    }

    return filteredCourses;
  }

  findById(id) {
    return this.courses.find(course => course.id === id);
  }

  create(courseData) {
    const newCourse = {
      id: uuidv4(),
      ...courseData,
      rating: 0,
      reviews: 0,
      students: 0,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.courses.push(newCourse);
    return newCourse;
  }

  update(id, courseData) {
    const courseIndex = this.courses.findIndex(course => course.id === id);
    if (courseIndex === -1) return null;

    this.courses[courseIndex] = {
      ...this.courses[courseIndex],
      ...courseData,
      updatedAt: new Date()
    };

    return this.courses[courseIndex];
  }

  delete(id) {
    const courseIndex = this.courses.findIndex(course => course.id === id);
    if (courseIndex === -1) return false;

    this.courses.splice(courseIndex, 1);
    return true;
  }

  getCategories() {
    return [...new Set(this.courses.map(course => course.category))];
  }

  getPopular(limit = 10) {
    return this.courses
      .sort((a, b) => b.students - a.students)
      .slice(0, limit);
  }

  getFeatured(limit = 6) {
    return this.courses
      .filter(course => course.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
}

module.exports = new Course();
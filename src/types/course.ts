export interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  lessons: number;
  thumbnail: string;
  instructor: Instructor;
  learningObjectives?: string[];
  prerequisites?: string[];
  modules?: Module[];
  reviewsData?: Review[];
}

export interface EnrolledCourse extends Course {
  progress: number;
  lastAccessed: string;
  completedLessons: number;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio?: string;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  completed?: boolean;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}
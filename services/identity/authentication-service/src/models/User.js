const bcrypt = require('bcryptjs');

// Mock user database
class User {
  constructor() {
    this.users = [
      {
        id: '1',
        name: 'John Student',
        email: 'student@luminax.com',
        password: bcrypt.hashSync('password123', 12),
        role: 'student',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Jane Instructor',
        email: 'instructor@luminax.com',
        password: bcrypt.hashSync('password123', 12),
        role: 'instructor',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: 'Admin User',
        email: 'admin@luminax.com',
        password: bcrypt.hashSync('password123', 12),
        role: 'admin',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date()
      }
    ];
  }

  findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  findById(id) {
    return this.users.find(user => user.id === id);
  }

  create(userData) {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.users.push(newUser);
    return newUser;
  }

  update(id, userData) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date()
    };

    return this.users[userIndex];
  }

  delete(id) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }

  getAll() {
    return this.users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}

module.exports = new User();
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Role-based permissions
const PERMISSIONS = {
  admin: ['*'], // All permissions
  instructor: [
    'courses:create',
    'courses:update',
    'courses:delete',
    'courses:read',
    'students:read',
    'analytics:read'
  ],
  student: [
    'courses:read',
    'courses:enroll',
    'progress:read',
    'progress:update',
    'certificates:read'
  ]
};

// Validation schemas
const checkPermissionSchema = Joi.object({
  token: Joi.string().required(),
  permission: Joi.string().required(),
  resource: Joi.string().optional()
});

class AuthorizationController {
  async checkPermission(req, res) {
    try {
      const { error } = checkPermissionSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.details[0].message
        });
      }

      const { token, permission, resource } = req.body;

      // Verify JWT token
      let decoded;
      try {
        decoded = jwt.verify(token, JWT_SECRET);
      } catch (jwtError) {
        return res.status(401).json({ 
          error: 'Invalid token',
          authorized: false 
        });
      }

      const userRole = decoded.role;
      const userPermissions = PERMISSIONS[userRole] || [];

      // Check if user has permission
      const hasPermission = userPermissions.includes('*') || 
                           userPermissions.includes(permission);

      res.status(200).json({
        authorized: hasPermission,
        user: {
          id: decoded.id,
          role: userRole
        },
        permission,
        resource
      });

    } catch (error) {
      console.error('Check permission error:', error);
      res.status(500).json({ 
        error: 'Authorization check failed',
        authorized: false 
      });
    }
  }

  async getUserPermissions(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header' });
      }

      const token = authHeader.split(' ')[1];
      
      let decoded;
      try {
        decoded = jwt.verify(token, JWT_SECRET);
      } catch (jwtError) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const userRole = decoded.role;
      const userPermissions = PERMISSIONS[userRole] || [];

      res.status(200).json({
        user: {
          id: decoded.id,
          role: userRole
        },
        permissions: userPermissions
      });

    } catch (error) {
      console.error('Get user permissions error:', error);
      res.status(500).json({ error: 'Failed to get user permissions' });
    }
  }

  async getRoles(req, res) {
    try {
      const roles = Object.keys(PERMISSIONS).map(role => ({
        name: role,
        permissions: PERMISSIONS[role]
      }));

      res.status(200).json({ roles });

    } catch (error) {
      console.error('Get roles error:', error);
      res.status(500).json({ error: 'Failed to get roles' });
    }
  }
}

module.exports = new AuthorizationController();
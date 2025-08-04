const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

// Mock payment database
class PaymentDatabase {
  constructor() {
    this.payments = [];
    this.paymentMethods = [];
  }

  createPayment(paymentData) {
    const payment = {
      id: uuidv4(),
      ...paymentData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.payments.push(payment);
    return payment;
  }

  findPaymentById(id) {
    return this.payments.find(payment => payment.id === id);
  }

  updatePayment(id, updates) {
    const index = this.payments.findIndex(payment => payment.id === id);
    if (index !== -1) {
      this.payments[index] = { ...this.payments[index], ...updates, updatedAt: new Date() };
      return this.payments[index];
    }
    return null;
  }

  getPaymentsByUser(userId) {
    return this.payments.filter(payment => payment.userId === userId);
  }
}

const paymentDB = new PaymentDatabase();

// Validation schemas
const createPaymentIntentSchema = Joi.object({
  amount: Joi.number().min(1).required(),
  currency: Joi.string().default('usd'),
  courseId: Joi.string().required(),
  userId: Joi.string().required()
});

const confirmPaymentSchema = Joi.object({
  paymentIntentId: Joi.string().required(),
  paymentMethodId: Joi.string().required()
});

class PaymentController {
  async createPaymentIntent(req, res) {
    try {
      const { error } = createPaymentIntentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.details[0].message
        });
      }

      const { amount, currency, courseId, userId } = req.body;

      // Create Stripe payment intent (mock for demo)
      const paymentIntent = {
        id: `pi_mock_${uuidv4()}`,
        amount: amount * 100, // Stripe uses cents
        currency,
        status: 'requires_payment_method',
        client_secret: `pi_mock_${uuidv4()}_secret_mock`
      };

      // Store payment in database
      const payment = paymentDB.createPayment({
        stripePaymentIntentId: paymentIntent.id,
        amount,
        currency,
        courseId,
        userId,
        status: 'pending'
      });

      res.status(200).json({
        paymentIntent: {
          id: paymentIntent.id,
          client_secret: paymentIntent.client_secret,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency
        },
        payment: {
          id: payment.id,
          status: payment.status
        }
      });

    } catch (error) {
      console.error('Create payment intent error:', error);
      res.status(500).json({ error: 'Failed to create payment intent' });
    }
  }

  async confirmPayment(req, res) {
    try {
      const { error } = confirmPaymentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.details[0].message
        });
      }

      const { paymentIntentId, paymentMethodId } = req.body;

      // Find payment in database
      const payment = paymentDB.payments.find(p => p.stripePaymentIntentId === paymentIntentId);
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }

      // Mock payment confirmation (in real app, this would call Stripe)
      const confirmedPayment = paymentDB.updatePayment(payment.id, {
        status: 'completed',
        paymentMethodId,
        completedAt: new Date()
      });

      res.status(200).json({
        payment: confirmedPayment,
        message: 'Payment confirmed successfully'
      });

    } catch (error) {
      console.error('Confirm payment error:', error);
      res.status(500).json({ error: 'Failed to confirm payment' });
    }
  }

  async getPayment(req, res) {
    try {
      const { id } = req.params;
      const payment = paymentDB.findPaymentById(id);

      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }

      res.status(200).json({ payment });

    } catch (error) {
      console.error('Get payment error:', error);
      res.status(500).json({ error: 'Failed to get payment' });
    }
  }

  async getUserPayments(req, res) {
    try {
      const { userId } = req.params;
      const payments = paymentDB.getPaymentsByUser(userId);

      res.status(200).json({ 
        payments,
        total: payments.length 
      });

    } catch (error) {
      console.error('Get user payments error:', error);
      res.status(500).json({ error: 'Failed to get user payments' });
    }
  }

  async refundPayment(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const payment = paymentDB.findPaymentById(id);
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }

      if (payment.status !== 'completed') {
        return res.status(400).json({ error: 'Payment cannot be refunded' });
      }

      // Mock refund process
      const refundedPayment = paymentDB.updatePayment(id, {
        status: 'refunded',
        refundReason: reason,
        refundedAt: new Date()
      });

      res.status(200).json({
        payment: refundedPayment,
        message: 'Payment refunded successfully'
      });

    } catch (error) {
      console.error('Refund payment error:', error);
      res.status(500).json({ error: 'Failed to refund payment' });
    }
  }

  async getPaymentStats(req, res) {
    try {
      const payments = paymentDB.payments;
      
      const stats = {
        totalPayments: payments.length,
        completedPayments: payments.filter(p => p.status === 'completed').length,
        pendingPayments: payments.filter(p => p.status === 'pending').length,
        refundedPayments: payments.filter(p => p.status === 'refunded').length,
        totalRevenue: payments
          .filter(p => p.status === 'completed')
          .reduce((sum, p) => sum + p.amount, 0)
      };

      res.status(200).json({ stats });

    } catch (error) {
      console.error('Get payment stats error:', error);
      res.status(500).json({ error: 'Failed to get payment stats' });
    }
  }
}

module.exports = new PaymentController();
const express = require('express');
const paymentController = require('../controllers/payment.controller');

const router = express.Router();

// Payment routes
router.post('/create-intent', paymentController.createPaymentIntent);
router.post('/confirm', paymentController.confirmPayment);
router.get('/stats', paymentController.getPaymentStats);
router.get('/:id', paymentController.getPayment);
router.get('/user/:userId', paymentController.getUserPayments);
router.post('/:id/refund', paymentController.refundPayment);

module.exports = router;
import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { addToCart, getCart, updateCartItem, removeCartItem, clearCart } from '../controllers/cartController.js';
const router = express.Router();

router.use(requireAuth);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', removeCartItem);
router.delete('/', clearCart);

export default router;

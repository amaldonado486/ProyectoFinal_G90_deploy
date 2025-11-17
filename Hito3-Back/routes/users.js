import express from 'express';
//import { requireAuth } from '../middleware/authMiddleware.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { me } from '../controllers/usersController.js';
const router = express.Router();

router.get('/me', requireAuth, me);

export default router;

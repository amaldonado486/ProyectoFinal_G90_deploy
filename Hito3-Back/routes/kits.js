import express from 'express';
import { listKits, getKit,createKit,updateKitStatus,updateKit   } from '../controllers/kitsController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', listKits);
router.get('/:id', getKit);
router.post("/",requireAuth, createKit);
router.put("/:id/estado", updateKitStatus);
router.put("/:id", updateKit);

export default router;

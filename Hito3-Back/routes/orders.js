import express from 'express';
import { requireAuth,adminMiddleware  } from '../middleware/authMiddleware.js';
//import { createOrder, getOrder } from '../controllers/ordersController.js';
import { createOrder,getOrder,getOrdersByUser,getAllOrders   } from "../controllers/ordersController.js";
const router = express.Router();

//router.get("/admin/all", requireAuth, adminMiddleware, getAllOrders);
router.get("/admin/all", requireAuth, adminMiddleware, (req,res,next)=>{
    console.log("Entrando a ruta GET /admin/all middleware OK");
    next();
}, getAllOrders);

router.post('/', requireAuth, createOrder);
router.get("/user/:userId", requireAuth, getOrdersByUser );
router.get('/:id', requireAuth, getOrder);



export default router;





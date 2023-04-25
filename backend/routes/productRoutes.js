import express from 'express'
import {deleteProduct, getProductById, getProducts} from '../controllers/productControllers.js'
const router = express.Router()
import { admin, protect } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)


export default router;
import express from 'express'
import { CreateProfile, getInfoDetail } from '../controller/profile.controller.js';
const router = express.Router();

// Nó là một mini app trong ứng dụng chính
// express.Router(): được dùng để tách cac route trong ứng dụng thành các module riêng biệt, 
// giúp tổ chức mã nguồn tốt hơn và dễ bảo trì hơn.

router.get('/info', getInfoDetail)
router.post('/create', CreateProfile)



export default router;
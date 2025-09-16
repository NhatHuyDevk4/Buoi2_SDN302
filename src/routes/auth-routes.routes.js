import express from 'express'
import { loginController, signupController } from '../controller/auth.controller.js';

const router = express.Router();
// express.Router(): được dùng để tách cac route trong ứng dụng thành các module riêng biệt, 
// giúp tổ chức mã nguồn tốt hơn và dễ bảo trì hơn.

router.post('/signup', signupController)

router.post('/login', loginController)


export default router;

// tách riêng ra controller để dễ quản lý hơn và sau này có thể tái sử dụng lại và dễ bảo trì hơn
// Tách ra như này cũng giúp code trong file routes ngắn gọn và dễ đọc hơn
// và config middleware cũng dễ dàng hơn
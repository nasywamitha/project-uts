import { Router } from 'express';
import { register, login, logout, lupasandi } from '../controllers/authController';

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/lupa-sandi', lupasandi);
export default router;
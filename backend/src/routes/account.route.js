import { Router } from 'express';
import { 
    registerAccount, 
    loginAccount, 
    logoutAccount 
} from '../controllers/account.controller.js';

const router = Router();

// Routes for Account management
router.route('/register').post(registerAccount);
router.route('/login').post(loginAccount);
router.route('/logout').post(logoutAccount);

export default router;
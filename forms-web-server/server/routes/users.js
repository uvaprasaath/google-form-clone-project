import express from 'express';
import * as userController from '../controllers/userController';
import Authenticate from '../utils/token'

const router = express.Router();
router.use(Authenticate.verifyToken)
router.get('/forms', userController.getAllFormForUser);

export default router;

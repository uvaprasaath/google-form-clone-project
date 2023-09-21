import express from 'express';
import * as authController from "../controllers/authController"

const router = express.Router();

router.post('/signUp', authController.signUp);
router.post('/login', authController.login);
router.post('/token', authController.accessToken);
export default router;

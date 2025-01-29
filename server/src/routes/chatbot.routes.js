import { Router } from 'express';
import { getCommonConditions, processChat } from '../controllers/chatbot.controller.js';

const router = Router();

// Chat routes
router.get('/conditions', getCommonConditions);
router.post('/chat', processChat);

export default router;


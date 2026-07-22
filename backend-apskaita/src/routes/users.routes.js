import express from 'express';

import {
  getUsersController,
  createUserController,
} from '../controllers/users.controller.js';

const router = express.Router();

// GET /api/v1/users
router.get('/', getUsersController);

// POST /api/v1/users
router.post('/', createUserController);

export default router;

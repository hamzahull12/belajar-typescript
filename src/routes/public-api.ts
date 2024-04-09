import express from 'express';
import { UsersHandler } from '../controller/users/users-handler';

export const publicRouter = express.Router();
publicRouter.post('/api/users', UsersHandler.registerHandler);
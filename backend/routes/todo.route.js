import { Router } from 'express';
import { createTodo, deleteTodoById, getTodoByUser } from '../src/controllers/todo.controller.js';
import { isLoggedIn } from '../src/middlewares/auth.middleware.js';

const router = Router();

router.use(isLoggedIn);

router.route('/')
        .get(getTodoByUser)
        .post(createTodo);

router.route('/:todoId')
        .delete(deleteTodoById);

export default router;
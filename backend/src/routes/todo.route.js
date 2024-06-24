import { Router } from 'express';
import { createTodo, deleteTodoById, getTodoByUser } from '../controllers/todo.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(isLoggedIn);

router.route('/')
        .get(getTodoByUser)
        .post(createTodo);

router.route('/:todoId')
        .delete(deleteTodoById);

export default router;
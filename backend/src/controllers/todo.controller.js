import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTodo = asyncHandler(async (req, res) => {
    const { title } = req.body;

    const todo = await Todo.create({ title });

    if(!todo) {
        return res.status(400).json(
            new ApiResponse(400, {}, "Error in create todo plase try later...")
        );
    }

    const { userId } = req.body.user;
    const user = await User.findById(userId);
    user.addTodo(todo._id);
    await user.save();
    await todo.save();
    
    res.status(201).json(
        new ApiResponse(201, todo, "Todo created success...")
    );
});

export const getTodoByUser = asyncHandler(async (req, res) => {
    const {userId} = req.body.user;
    
    const user = await User.findById(userId).populate('todos');

    if(!user) {
        return res.status(404).json(
            new ApiResponse(404, {}, "Todos not found...")
        );
    }

    res.status(200).json(
        new ApiResponse(200, user.todos, "Todos fetch success...")
    );
});

export const deleteTodoById = asyncHandler(async (req, res) => {
    const {todoId} = req.params;
    const todo = await Todo.findById(todoId);
    if(!todo) {
        return res.status(404).json(
            new ApiResponse(404, {}, "Todo not found...")
        );
    }
    
    const {userId} = req.body.user;
    const user = await User.findById(userId);
    user.deleteTodo(todoId);

    await user.save();
    await Todo.findByIdAndDelete(todoId);

    res.status(202).json(
        new ApiResponse(202, user, "Todo delete success...")
    );
});
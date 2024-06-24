import { model, Schema } from 'mongoose';

const todoSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
    },
}, {
    timestamps: true,
});


const Todo = model("Todo", todoSchema);

export default Todo;
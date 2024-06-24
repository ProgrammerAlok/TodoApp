import { model, Schema } from 'mongoose';
import { EmailRegx } from '../utils/constants.js';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "First name is required"],
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return EmailRegx.test(v);
            },
            message: props => `${props.value} is not a valid email!`,
        },
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Todo",
        }
    ]
}, {
    timestamps: true,
});

userSchema.methods = {
    encryptPassword: function() {
        this.password = bcryptjs.hashSync(this.password, 10);
    },    
    isPasswordMatched: function(password) {
        return bcryptjs.compareSync(password, this.password);
    },  
    addTodo: function(todoId) {
        this.todos.push(todoId);
    },
    deleteTodo: function(todoId) {
        this.todos = this.todos.filter(todo => todo.toString() !== todoId);
    } 
};


const User = model("User", userSchema);

export default User;
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

export const registerUser = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.create({
        firstName, lastName, email, password
    });

    user.encryptPassword();

    await user.save();

    return res.status(201).json(
        new ApiResponse(201, user, "user created successfully...")
    );
});

export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({email});
    
    if(!user) {
        throw new ApiError(404, "User not found...");
    }
    
    if(!(await user.isPasswordMatched(password))) {
        throw new ApiError(401, "Invalid password...");
    }

    const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: process.env.JWT_EXPIRY,
        }
    );
    console.log(token)
    res
    .cookie('token', token, {
        // path: '/',
        // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    })
    .status(200)
    .json(
        new ApiResponse(200, user, "user loggedin successfully...")
    );
});

export const getUser = asyncHandler(async (req, res, next) => {
    const { userId } = req.body.user;
    
    const user = await User.findById(userId);
    
    if(!user) {
        throw new ApiError(404, "User not found...");
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, user, "user get successfully...")
    );
});

export const logout = asyncHandler(async (req, res, next) => {    
    res
    .clearCookie('token')
    .status(200)
    .json(
        new ApiResponse(200, {}, "user logout successfully...")
    );
});
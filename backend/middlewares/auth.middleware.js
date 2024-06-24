import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

export const isLoggedIn = asyncHandler(async (req, res, next) => {
    const cookie = req?.headers?.cookie;
    
    if (!cookie) {
      throw new ApiError(401, "cookie not found...");
    }
    
    const [,token] = cookie?.split('=');
    console.log(token)
    if (!token) {
      throw new ApiError(401, "token not found...");
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode)
    req.body.user = decode;

    next();
});
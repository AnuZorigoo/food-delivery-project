import type { RequestHandler } from "express"
import jwt from "jsonwebtoken";
import type { UserModel } from "../database/schema/index.js";


export const authMiddleware: RequestHandler= (req, res, next) => {
    const authorization = req.headers.authorization; 

    if (!authorization) return res.status(401).json({ message: 'Unauthorized' });

    const token = authorization.split(' ')[1] as string;

    try{
        const { user } = jwt.verify(token, "secretkey") as { user: Omit<typeof UserModel, 'password'> };
        next();
    }
    catch{
        return res.status(401).json({ message: 'Invalid token' });
    }
    
}
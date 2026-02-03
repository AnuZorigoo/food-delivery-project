import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/index.js";


export const register:RequestHandler=async (req,res)=>{
    const {username, email, password, role}=req.body;

    const isUserExist=await UserModel.findOne({username});
    if (isUserExist) return res.status(409).json({message:'Username already exists'});

    const isEmailExist=await UserModel.findOne({email});
    if (isEmailExist) return res.status(409).json({message:'Email already exists'});

    const user=await UserModel.create({username, email, password, role});

    res.status(201).json({user});
    }

   

import { Schema,model } from "mongoose";

const orderSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'User',required:true},
    orderItems:[{
        foodId:{type:Schema.Types.ObjectId,ref:'Food',required:true},
        quantity:{type:Number,required:true},
        price:{type:Number,required:true}
    }],
    totalPrice:{type:Number,required:true},
    status:{type:String,required:true,default:'Pending'},
    
},{timestamps:true});

export const OrderModel=model('Order',orderSchema);
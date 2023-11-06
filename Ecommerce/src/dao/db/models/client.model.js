import { Schema, model } from "mongoose";

const clientSchema = new Schema({
    first_name: {
        type:String,
        required:true
    },
    last_name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        index: true
    },
    gender: {
        type:String,
        required:true
    },
    calification: {
        type:Number,
        required: true,
    }
})

export const clientModel = model('Client', clientSchema)
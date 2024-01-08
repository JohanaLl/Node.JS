import { Schema, SchemaTypes, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const usersSchema = new Schema({
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
    password: {
        type:String,
        required:true
    },
    age: {
        type:Number
    },
    isSingle: {
        type:Boolean,
        default:false
    },
    isGithub: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["ADMIN", "PREMIUM", "CLIENT"],
        default: "CLIENT",
    },
    cart: [
    {
        type: [{
            type: SchemaTypes.ObjectId,
            ref: 'Cart'
        }],
        _id: false,
        default: [],
    }]
})

usersSchema.plugin(mongoosePaginate);

export const usersModel = model('Users', usersSchema)
import { Schema, model } from "mongoose";

const cartSchema = new Schema ({
    products: {
        type: Array,
        require:true
    }
})

export const cartModel = model('Cart', cartSchema)
import { userModel } from "../db/models/users.model";

class UsersManager {
    async findById(id) {
        const response = await userModel.findById(id);
        return response;
    }

    async findByEmail(email) {
        const response = await userModel.findOne({ email });
        return response;
    }

    async createOne(obj) {
        const response = await userModel.create(obj);
        return response;
    }
}

export const userManager = new UsersManager();
import { usersModel } from "../db/models/users.model.js";

class UsersManager {

    async findAll() {
        const response = await usersModel.find()
        return response;
    }

    async createOne(obj) {
        const response = await usersModel.create(obj);
        return response;
    }
}

export const usersManager = new UsersManager();
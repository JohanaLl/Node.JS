import { usersModel } from "../db/models/users.model.js";
import BasicManger from "./basic.manager.js";

class UsersManager extends BasicManger {

    constructor() {
        super(usersModel, ['courses']);
    }

    async getByEmail(email) {
        const response = await usersModel.findOne({ email });
        return response;
    };
}

export const usersManager = new UsersManager();
import { usersModel } from "../db/models/users.model.js";

class UsersManager {

    async findAll() {
        const response = await usersModel.find()
        return response;
    }

    //.explain retorna la explicación de  las estadisticas de la ejecuón de la petición
    async findById(id) {
        const response = await usersModel.findById(id).explain('executionStats');
        return response;
    }

    async findBEmail(email) {
        const response = await usersModel.findOne({ email });
        return response;
    }

    async createOne(obj) {
        const response = await usersModel.create(obj);
        return response;
    }

    async updateOne(id, obj) {
        const response = await usersModel.updateOne({ _id: id }, obj);
        return response;
    }

    async deleteOne(id) {
        const response = await usersModel.deleteOne({ _id: id });
        return response;
    }
}

export const usersManager = new UsersManager();
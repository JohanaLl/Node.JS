import { usersModel } from "../db/models/users.model.js";

class UsersManager {

    async findAll(obj) {
        const { limit, page } = obj
        const response = await usersModel.paginate({isSingle:true},{ limit, page });
        const info = {
            count: response.totalDocs,
            pages: response.totalPages,
            // next: hasNextPage ? `http://localhost:8080/api/users?pages=${response.nextPage}` :  null,
            // prev: hasPrevPage ? `http://localhost:8080/api/users?pages=${response.prevPage}` :  null
        };
        const results = response.docs;
        return { results };
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

    async findAggre() {
        const response = await usersModel.aggregate([
            [ { $match : { isSingle : true } },
                { $sort : { email : 1 } } 
            ]
        ]);
        return response;
    }
}

export const usersManager = new UsersManager();
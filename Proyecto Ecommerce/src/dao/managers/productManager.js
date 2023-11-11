import { productModel } from "../db/models/product.model.js";

class ProductManager {

    async findAll(obj) {
        const { limit = 10, page = 1, sort, ...filter } = obj
        const response = await productModel.paginate(filter, { limit, page });
        if (sort) {
            if (sort === 'asc') {
                response.docs.sort((a, b) => a.price - b.price);
            } else if (sort === 'desc') {
                response.docs.sort((a, b) => b.price - a.price);
            } 
        }
        const info = {
            status: "success",
            payload: response.docs,
            totalPages: response.totalDocs,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: response.hasPrevPage
            ? `http://localhost:8080/api/users?page=${response.prevPage}`
            : null,
            nextLink: response.hasNextPage
            ? `http://localhost:8080/api/users?page=${response.nextPage}`
            : null,
        }
        return response;
    }

    async findById(id) {
        const response = await productModel.findById(id);
        return response;
    }

    async createOne(obj) {
        const response = await productModel.create(obj);
        return response;
    }

    async updateOne(id, obj) {
        const response = await productModel.updateOne({ _id: id }, obj);
        return response;
    }

    async deleteOne(id) {
        const response = await productModel.deleteOne({ _id: id })
        return response;
    }
}

export const productManager = new ProductManager();
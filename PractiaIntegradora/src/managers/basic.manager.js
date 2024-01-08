export default class BasicManger {

    constructor(model, populateProps) {
        this.model = model;
        this.populateProps = populateProps;
    }

    async getAll() {
        const response = await this.model.find().populate(this.populateProps);
        return response;
    }

    async getById(id) {
        const response = await this.model.findById(id).populate(this.populateProps);
        return response;
    }

    async createOne(obj) {
        const response = await this.model.create(obj);
        return response;
    }

    async updateOne(id, obj) {
        const response = await this.model.findByIdAndUpdate(id, obj);
        return response;
    }

    async deleteOne(id) {
        const response = await this.model.findByIdAndDelete(id);
        return response;
    }
}
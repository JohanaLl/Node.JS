import { clientModel } from "../db/models/client.model.js";

class ClientManager {

    async findAggre() {
        const response = await clientModel.aggregate([
            { 
                $match: { 
                    $and: [ { calification: { $gt: 4 , $lt: 10 }} ] 
                }
            },
            {
                $group: {
                    _id: "$gender",
                    clients_count: { $count: {} },
                    prom_calification: { $avg: "$calification" },
                }
            },
            {
                $match: {
                    clients_count: { $gte: 5 }
                }
            },
            { $sort: { prom_calification: 1 }},
            
        ])

        return response;
    }
}

export const clientManager = new ClientManager();
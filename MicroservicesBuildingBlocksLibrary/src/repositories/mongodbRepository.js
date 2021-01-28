export class MongoDBRepository {
    constructor(collection) {
        this.collection = collection;
    }

    findByField(fieldKey, value) {
        const query = {[fieldKey]: value};
        return this.collection.findOne(query);
    }

    findInRange(fieldKey, lowerBondary, upperBoundary) {
        const query = {
            [fieldKey]: {
                $gte: upperBoundary,
                $lt: lowerBondary
            }
        };
        return this.collection.find(query);
    }

    add(entity) {
        this.collection.insertOne(entity.toJSON());
    }

    addRange(entities) {
        const jsonEntities = entities.map(entity => entity.toJSON());
        this.collection.insertMany(jsonEntities);
    }
}
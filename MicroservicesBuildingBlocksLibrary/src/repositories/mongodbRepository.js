export class MongoDBRepository {
    constructor(collection) {
        this.collection = collection;
    }

    findByField(fieldKey, value) {
        const query = ({[fieldKey]: value});
        return this.collection.findOne(query);
    }

    findInRange(fieldKey, start, end) {

    }

    add(entity) {
        this.collection.insertOne(entity.toJSON());
    }

    addRange(entities) {

    }
}
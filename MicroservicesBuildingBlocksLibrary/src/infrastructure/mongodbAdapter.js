import { MongoClient } from 'mongodb';
import { MongoDBRepository } from '~/src/repositories/mongodbRepository';

const formatCollectionName = collectionName => collectionName.replace(
  /(-\w)/g, function(w) { return w[1].toUpperCase() }
);

export const InitializeMongoWithCollections = (appContext, url, databaseName) => {
  return MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
      const db = client.db(databaseName);

      return db.listCollections()
        .toArray()
        .then(collections => {          
          const collectionsObjects = collections.map(collection => {
            const collectionName = formatCollectionName(collection.name);
            return {[collectionName]: new MongoDBRepository(db.collection(collection.name))};
          }).reduce((acc, curr) => ({...acc, ...curr}), {});

          return [collectionsObjects, db];
        })
    })
    .then(([collectionsObjects, db]) => {
      console.log(`Connected to database ${db.databaseName}`);
      appContext[db.databaseName] = collectionsObjects;

      return appContext;
    })
    .catch((err) => console.error(err));
}
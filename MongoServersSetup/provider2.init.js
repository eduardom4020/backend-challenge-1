db.createUser({
  user: 'provider2',
  pwd: '123abc',
  roles: [
    {
      role: 'readWrite',
      db: 'provider2'
    }
  ]
});

db.createCollection('bank-statement', { autoIndexId: true });
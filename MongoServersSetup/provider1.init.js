db.createUser({
  user: 'provider1',
  pwd: '654321',
  roles: [
    {
      role: 'readWrite',
      db: 'provider1'
    }
  ]
});

db.createCollection('bank-statement', { autoIndexId: true });
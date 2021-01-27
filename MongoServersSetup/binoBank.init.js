db.createUser({
  user: 'binoBank',
  pwd: '123456',
  roles: [
    {
      role: 'readWrite',
      db: 'binoBank'
    }
  ]
});

db.createCollection('bank-statement', { autoIndexId: true });
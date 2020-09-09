const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email) {
    this.email = email;
    this.name = username
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  static findBy(user) {
    const db = getDb();
    return db.collection('users').find({ _id: new ObjectId(userId)}).next();
  }
}

module.exports = User;
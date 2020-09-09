const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.email = email;
    this.name = username
    this.cart = cart
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp._id === product._id
    // });
    const updatedCart = { items: [{ ...product, quantity: 1 }] }
    const db = getDb();
    return db.collection('users').updatedOne({ _id: new ObjectId(this._id) }, { $set: { cart: updatedCart } });
  }

  static findBy(user) {
    const db = getDb();
    return db.collection('users').find({ _id: new ObjectId(userId) }).next();
  }
}

module.exports = User;
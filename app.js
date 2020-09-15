const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.tnfyo.gcp.mongodb.net/Cluster0?retryWrites=true&w=majority'
const SECRET = '!+%G!THghfdgre+%R43trgfd44'

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  }))
// the cookie on the client identifies a server side session
// the session on the server are often used for authentication. etc: isLoggedIn =  true

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);


mongoose
  .connect(MONGODB_URI)
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'UserName',
          email: 'test@test.com',
          cart: {
            items: []
          }
        });
        user.save()
      }
    })

    app.listen(3010)
  })
  .catch(err => console.log(err));
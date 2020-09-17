const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.tnfyo.gcp.mongodb.net/Cluster0?retryWrites=true&w=majority'
const SECRET = '!+%G!THghfdgre+%R43trgfd44'

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  }
  ,
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }

})

const fileFilter = (req, file, cb) => {
  if (file.mimeType === 'image/png' || file.mimeType === 'image/jpg' || file.mimeType === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false)
  }
}



app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));



app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));



app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash())

app.use((req, res, next) => {
  // throw new Error('Dummy')
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {

      // throw new Error('Dummy')

      if (!user) {
        next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      // throw new Error(err)
      next(new Error(err));          //   <-----------use NEXT
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((err, req, res, next) => {

  // res.redirect('/500')

  //inside async promise then -> use NEXT
  //global place -> throw error

  res.status(500).render('500', {     //    <----------- avoid infinite loop 
    // caused by redirect - new req -> error -> new req -error..........................
    pageTitle: 'Error',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });

})

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3010);
  })
  .catch(err => {
    console.log(err);
  });

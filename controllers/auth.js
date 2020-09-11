exports.getLogin = (req, res, next) => {

  const isLoggedIn = req
    .get('Cookie')
    .trim()
    .split('=')[1] 
    === 'true'

  console.log(isLoggedIn)


  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {

  res.setHeader('Set-Cookie', 'loggedIn=true')
  res.redirect('/');

};
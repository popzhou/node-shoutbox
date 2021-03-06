const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../lib/user');
const messages = require('../lib/messages');

exports.form = (req, res, next) => {
  res.render('login', { title: 'Login' });
};

exports.submit = (req, res, next) => {
  var data = req.body.user;
  
  User.authenticate(data.name, data.pass, (err, user) => {
    if (err) return next(err);

    if (user) {
      req.session.uid = user.id;
      res.redirect('/');
    } else {
      messages.error(req, '对不起，您输入的用户名或密码不正常');
      res.redirect('back');
    }
  })
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    
    req.logout();
    res.redirect('/');
  });
};
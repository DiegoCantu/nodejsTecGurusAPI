const mongoose = require('mongoose');

exports.init = () => {
  mongoose
    .connect(
      'mongodb+srv://admin:admin@cluster0-03ypf.mongodb.net/test?retryWrites=true&w=majority',
      { useNewUrlParser: true },
    )
    .then(() => console.log('Ok'))
    .catch(() => console.log('Error'));
};

exports.secret = 'fj92jf403j8909j321j9f4091300jf4019j303jfr0fASF$(';

const CityController = require('./City');
const MovieController = require('./Movie');
const UserController = require('./User');

exports.init = (expressApp) => {
  expressApp.get('/', (req, res) => {
    res.send('Hello Heroku!');
  });

  CityController.init(expressApp);
  MovieController.init(expressApp);
  UserController.init(expressApp);
};

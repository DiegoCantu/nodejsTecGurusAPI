const CityController = require('./City');
const MovieController = require('./Movie');
const UserController = require('./User');

exports.init = (expressApp) => {
  expressApp.get('/Otro', (req, res) => {
    res.send('Otro');
  });

  CityController.init(expressApp);
  MovieController.init(expressApp);
  UserController.init(expressApp);
};

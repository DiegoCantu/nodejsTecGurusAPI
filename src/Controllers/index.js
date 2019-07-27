const CityController = require('./City');
const MovieController = require('./Movie');


exports.init = (expressApp) => {
  expressApp.get('/Otro', (req, res) => {
    res.send("Otro");
  });

  CityController.init(expressApp);
  MovieController.init(expressApp);

}

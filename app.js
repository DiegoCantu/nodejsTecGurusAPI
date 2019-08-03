const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const config = require('./src/config');
const Controllers = require('./src/Controllers');
const Auth = require('./src/middlewares/Auth');

config.init();
app.use(bodyParser.json());
app.use(Auth);
Controllers.init(app);

app.get('/', (req, res) => {
  res.send('Test');
});

app.listen(3000);

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const app = express();

const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));

require('./api/routes')(router);

app.use('/', router);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
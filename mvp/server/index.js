const express = require('express');
const morgan = require('morgan');
const db = require('../database/index.js')
const app = express();
const port = 3000;

app.use(morgan('dev'));

app.use('/', express.static('public'));

app.get('/info', (req, res) => {
  db.getAllInfo((err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Message listening at port http://localhost:${port}`);
});

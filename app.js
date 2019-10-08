const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();

app.use(morgan('common'));
app.use(cors());

const plays = require('./playstore.js');

app.get('/plays', (req, res) => {
    const { genres = "", sort } = req.query;

    if (sort) {
      if (!['App', 'Rating'].includes(sort)) {
        return res
                .status(400)
                .send('Sort must be one of app or rating');
      }
    }
        
    let results = plays.filter(play => play.Genres.includes(genres));

    if(sort) {
          results
              .sort((a,b) => {
                  return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
              });
    }

    res.json(results);
});


module.exports = app;
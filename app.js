const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();

app.use(morgan('common'));
app.use(cors());

const plays = require('./playstore.js');

app.get('/apps', (req, res) => {
    const { genres = "", sort } = req.query;

if (sort) {
  if (!['app', 'rating'].includes(sort)) {
    return res
      .status(400)
      .send('Sort must be one of app or rating');
  }
}
    
let results = plays.filter(play => play.Genres.includes(genres));
// I HAVE TO MAKE THE SORT WORK -------------- THE REST IS DONE-------------
// if(sort) {
// results
// .sort((a,b) => {
// return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
// });
// }

res
.json(results);
});

app.listen(8000, () => {
    console.log('Server started at http://localhost:8000');
})
// Get dependencies
const express = require('express');
const path = require('path');
const jwt = require('express-jwt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// mongoose.connect('mongodb://localhost/mean-app');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('node_modules'));


const authCheck = jwt({
  secret: 'AIagBKXNB3yL_ny8DGegILwTrEgEfjVj5tHCgcOs4NFXT3meMzrof6F',
  audience: 'kBgNCNMitAa04BdrkjlmQr6zMj0O8sm6'
});

// Set our api routes
app.use('/api', api);

app.get('/profile', authCheck, (req,res)=>{
  console.log(req);
  let user = {
    username: 'ok',
    email: 'ok@ok.com'
  };
  res.json(user);
})

app.get('/deals/public', function(req, res){
  console.log('request deals');
  res.json([{
    id: 1234,
    name: 'Muse concert in berlin',
    description: 'Description of Product 1...',
    img: 'https://muse-cdn.warnerartists.com/ugc-1/gallery/4196/10722_original.jpg',
    bestValue: 199.99, // Original price of product
    startingAt: 129.99 // Sale price of product
},
{
    id: 1235,
    name: 'el classico',
    img: 'http://akns-images.eonline.com/eol_images/Entire_Site/201295/reg_1024.soccer.mh.100512.jpg',
    description: 'Description of Product 2...',
    bestValue: 299.99, // Original price of product
    startingAt: 169.99 // Sale price of product
},
{
    id: 1236,
    name: 'NBA playoffs game',
    img: 'http://i2.cdn.turner.com/nba/nba/dam/assets/160413134216-playoffs-2016-official-t1-creative.home-t1.jpg',
    description: 'Description of Product 3...',
    bestValue: 499.99, // Original price of product
    startingAt: 249.99 // Sale price of product
}]);
});

app.get('/*', function (req, res) {
  console.log("New Client")
  res.sendFile(__dirname + "/dist/index.html");
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
// const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, () => console.log(`API running on localhost:${port}`));
const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use(morgan('dev'));
app.use('/jquery', express.static(path.resolve(`${__dirname}/node_modules/jquery/dist`)))
app.use(express.static(path.resolve(`${__dirname}/public`)))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next)=> {
  res.render('index', { GOOGLE_API_KEY: process.env.GOOGLE_API_KEY });
})

app.use((err, req, res, next)=> {
  res.render('error', { err });
})

const port = process.env.PORT || 4000;
app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
})

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
//stores config vars in .env to the process obj
const dotenv = require('dotenv').config("path: ../.env");

const db = require('./db/db.js');

const app = express();
const server = http.createServer(app);

const routesEvent = require('./routes/eventRoutes.js');
console.log("This is routesEvent variable::: ", routesEvent);

// const multiparty = require('connect-multiparty');
// const multipartyMiddleware = multiparty();
// app.use(multipartyMiddleware);

// data chunking into json format
app.use(bodyParser.json());
// debugging tool
app.use(morgan('dev'));

app.use(express.static('../client'));

app.use('/api/event', routesEvent);

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), () => {
  console.log(moment().format('h:mm:ss a'), ': Express Server listening on port', app.get('port'));
});
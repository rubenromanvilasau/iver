const express = require('express');
const http = require('http');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index');
require('dotenv').config();
const { initSocket } = require('./websocket');

const app = express();
const server = http.createServer(app);
initSocket( server );

app.set( 'port', process.env.PORT || 4000 );
app.use( cors() )
.use( bodyParser.json() )
.use( compression() );

app.use('/api', routes);

server.listen( app.get('port'), () => {
    console.log('BACKEND RUNNING ON PORT ', app.get('port'));
} );
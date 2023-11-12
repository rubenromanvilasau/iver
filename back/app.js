const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index');
require('dotenv').config();


const app = express();

app.set( 'port', process.env.PORT );
app
    .use( cors() )
    .use( bodyParser.json() )
    .use( compression() );

app.use('/api', routes);

app.listen( app.get('port'), () => {
    console.log('BACKEND RUNNING ON PORT ', app.get('port'));
} );
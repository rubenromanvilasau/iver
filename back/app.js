const express = require('express');
const http = require('http');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index');
require('dotenv').config();
const { initSocket } = require('./websocket');
const morgan = require("morgan");

const app = express();
const server = http.createServer(app);
initSocket( server );

app.set( 'port', process.env.PORT || 4000 );
app
    .use( cors() )
    .use( bodyParser.json() )
    .use( compression() )
    .use( morgan("dev") )
    .use('/api', routes);


//* NEEDS AN IMPROVEMENT
app.get('/items-photos/:filename', (req, res) => {
    if(!req.params.filename) return res.status(400).send({message: 'filename is required'})
    
    const filename = req.params.filename
    res.sendFile(`${__dirname}/items-photos/${filename}`);
})

// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

server.listen( app.get('port'), () => {
    console.log('BACKEND RUNNING ON PORT ', app.get('port'));
} );
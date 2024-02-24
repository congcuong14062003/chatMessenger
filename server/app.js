// server.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors')
var cookieParser = require('cookie-parser');

app.use(cookieParser());
//server
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,
}));


// Sử dụng body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set morgan log
app.use(morgan("dev"));



// Import RouterMain and pass 'app' as parameter
import RouterMain from './src/router/router';
RouterMain(app);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

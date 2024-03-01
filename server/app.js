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
const socketIo = require('socket.io');
const io = socketIo(server);
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

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('message', (data) => {
        console.log('Received message:', data);
        // Xử lý tin nhắn ở đây và gửi lại cho các client khác
        // socket.broadcast.emit('message', data);
        io.emit("message", { message: "Chào số 7 nhé. Có 1 tin nhắn dành cho bạn" });

        // Gửi thông báo cho đối phương về việc nhận tin nhắn mới
        io.emit("notification", { message: "Bạn nhận được một tin nhắn mới" });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});




// Import RouterMain and pass 'app' as parameter
import RouterMain from './src/router/router';
RouterMain(app);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

import * as express from 'express';
import apiRouter from './routes';
import { v4String } from 'uuid/interfaces';

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

io.on('connection', socket => {
  socket.on('join-room', (roomId:v4String, userId:v4String) => {
    console.log(roomId, userId);
  });
});

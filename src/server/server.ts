import * as express from 'express';
import * as socketIO from 'socket.io';
import * as path from 'path';
import apiRouter from './routes';
import { createServer, Server as HTTPServer } from 'http';

class Server {
  private httpServer: HTTPServer;
  private app: express.Application;
  private io: socketIO.Server;

  private readonly DEFAULT_PORT = 3000;

  constructor() {
    this.initialize();

    this.handleRoutes();
    this.handleSocketConnection();
  }

  public listen(callback: (port: number) => void): void {
    this.httpServer.listen(this.DEFAULT_PORT, () =>
      callback(this.DEFAULT_PORT)
    );
  }

  private initialize(): void {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = socketIO(this.httpServer);

    this.configureApp();
    this.handleSocketConnection();
  }

  private handleRoutes(): void {
    this.app.use(apiRouter);
  }

  private configureApp(): void {
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  private handleSocketConnection(): void {
    this.io.on('connection', socket => {
      console.log('Socket connected.');


      socket.on('join-room', (roomId, clientId) => {
        console.log(roomId, clientId);
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('client-connected', clientId);
      });
    });
  }
}

const server = new Server();

server.listen(port => {
  console.log(`Server is listening on http://localhost:${port}`);
});


export default Server;

// import * as express from 'express';
// import * as socketIo from 'socket.io';
// import * as cors from 'cors';
// import apiRouter from './routes'
//
// const http = require('http');
//
// //Port from environment variable or default - 4001
// const port = process.env.PORT || 3000;
//
// //Setting up express and adding socketIo middleware
// const app = express();
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// const server = http.createServer(app);
// const io = socketIo(server);
//
// app.use(express.static('public'));
// app.use(apiRouter);
//
// io.on('connection', socket => {
//   console.log('New client connected');
//
//   //Here we listen on a new namespace called 'incoming data'
//   socket.on('incoming data', (roomId, clientId) => {
//     //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
//     socket.broadcast.emit('outgoing data', { num: roomId });
//   });
//
//   //A special namespace 'disconnect' for when a client disconnects
//   socket.on('disconnect', () => console.log('Client disconnected'));
//
//   socket.on('join-room', (roomId, clientId) => {
//     console.log(roomId, clientId);
//     socket.join(roomId);
//     socket.to(roomId).broadcast.emit('client-connected', clientId);
//   })
//
// });
//
// server.listen(port, () => console.log(`Listening on port ${port}`));

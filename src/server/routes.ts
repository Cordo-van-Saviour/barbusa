import * as express from 'express';
import { v4 } from 'uuid';
import * as path from 'path';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
  res.json('World');
});

router.get('/api/:room', (req, res, next) => {
  res.status(200).send({ room: req.params.room });
});

router.get('/api/', (req, res, next) => {
  res.status(200).send({ room: v4() });
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

export default router;

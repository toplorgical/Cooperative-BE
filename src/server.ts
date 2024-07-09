import http from 'http'
import app from './app';
import dotenv from 'dotenv';

const server = http.createServer(app)

const port = process.env.PORT || 8000;


dotenv.config();

server.listen(port, () => {
    console.log(`Server is running on http://localhost: ${port}`);

  });
  
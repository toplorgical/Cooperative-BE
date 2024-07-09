import http from "http";
import app from "./app";
import config from "./config/config";
import dbClient from "./config/dbClient";

const server = http.createServer(app);

const port = config.PORT;

dbClient.connect();
server.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port}`);
});

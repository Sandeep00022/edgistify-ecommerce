import http from "http";
import app from "./app.js";
import connectDb from "./config/config.js";

const port = process.env.PORT || 3000;
connectDb();
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

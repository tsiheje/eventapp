const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3004;

server.listen(port, '0.0.0.0', () => {
    console.log(`Server started on port ${port}`);
});
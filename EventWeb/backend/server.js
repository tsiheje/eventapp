require('dotenv').config();
const express = require("express");
const http = require("http");
const corsOptions = require('./middlewares/cors');
const app = express();
const server = http.createServer(app);
const routes = require("./routes/index")
const port = process.env.PORT || 3004;

app.use(express.json());

app.use(corsOptions);

app.use('/api', routes);

server.listen(port, '0.0.0.0', () => {
    console.log(`Server started on port ${port}`);
});
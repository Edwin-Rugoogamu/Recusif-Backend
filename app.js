// import { createServer } from "http";

const express = require("express");

const app = express();
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");

const Login = require("./routes/loginRoutes");
const config = require("./config/db")
const Benefits = require("./routes/benefitsRoutes")
const chatMessage = require("./routes/chatMessage")
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");





const http = require('http').createServer(app);
const cors = require('cors');

app.use(cors());


const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173",
        methods:["GET", "POST"],
    }
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
  
    //sends the message to all the users on the server
    socket.on('message', (data) => {
      socketIO.emit('messageResponse', data);
    });
  
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());
app.use("/", Login);
app.use("/", Benefits);
app.use("/", chatMessage);

app.use(passport.initialize());
app.use(passport.session());



config.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public/images")));

app.get("*", (req, res) => {
  res.status(404).send("Page doesn't exist");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

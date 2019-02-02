const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);


const PORT = process.env.PORT || 3001;

const routes = require("./routes/routes");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
app.use(logger("dev"));
// Use apiRoutes
app.use("/api", routes);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/weatherdata";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Send every request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

io.on("connection", (socket) => {
    console.log("connection made");
    socket.emit("test", "Hello there!");
    socket.on("post", () => {
        socket.broadcast.emit("get");
        console.log("Post request made");
    });
    socket.on("message", (data) => {
        console.log(data);
    });
});

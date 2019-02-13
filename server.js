const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.static(__dirname + "/build"));
app.use("/build", express.static("public"));

app.use(morgan("dev"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/*", (req, res) => {
  res.sendStatus(404);
});

app.listen(8081, "localhost", () => {
  console.log("Tic-Tac-Toe server Listening on port 8081");
});

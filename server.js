const express = require("express");

const app = express();

const setHeaders = (res) => {
  res.set("Cache-Control", "public, max-age=2000000");
};

app.use(
  "/r",
  express.static(__dirname + "/r", {
    setHeaders,
  })
);
app.use(
  "/r1",
  express.static(__dirname + "/r1", {
    setHeaders,
  })
);
app.use(
  "/r2",
  express.static(__dirname + "/r2", {
    setHeaders,
  })
);
app.use(
  "/main-map",
  express.static(__dirname + "/main-map", {
    setHeaders,
  })
);
app.use(
  "/assets",
  express.static(__dirname + "/assets", {
    setHeaders,
  })
);

app.get("/", async (req, res) => {
  try {
    res.sendFile(__dirname + "/index.html");
  } catch (err) {
    console.log(err);

    res.json(err);
  }
});

app.listen(5123, "0.0.0.0");

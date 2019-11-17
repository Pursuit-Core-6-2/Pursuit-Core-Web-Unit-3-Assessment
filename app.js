const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const researchersRouter = require("./routes/researchersRoute");
const speciesRouter = require("./routes/speciesRoute");
const animalsRouter = require("./routes/animalsRoute");
const habitatsRouter = require("./routes/habitatsRoute");
const sightingsRouter = require("./routes/sightingsRoute");
app.use("/researchers", researchersRouter);
app.use("/species", speciesRouter);
app.use("/animals", animalsRouter);
app.use("/habitats", habitatsRouter);
app.use("/sightings", sightingsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json({
      payload: "Nothing found here. The endpoint or method is unhandled by the Server",
      err: true
    })
  });
  
// error handler
app.use(function (err, req, res, next) {
    console.log(err)
    res.status(err.status || 500);
    res.json({
        payload: {
        err: err,
        errStack: err.stack
        },
        err: true
    });
});

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});

module.exports = app;
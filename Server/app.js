const express = require('express');
const cors = require('cors');

const app = express();
const port = 29000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
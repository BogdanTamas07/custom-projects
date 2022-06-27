const express = require("express");
const app = express();

const port = 3000;

app.get(`/seeData/:id`, (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < 1000; i++) {
    console.log(i);
  }
  res.status(200).send(id);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

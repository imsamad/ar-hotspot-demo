const express = require("express");

const app = express();

const morgan = require("morgan");
const cors = require("cors");
const multiParty = require("connect-multiparty");

const connectMdlwr = multiParty({ uploadDir: "./public/images" });

app.use(cors());
app.use(morgan("dev"));
app.use("/images", express.static("./public/images"));

app.post("/upload", connectMdlwr, (req, res) => {
  console.log("Files sent :- ", req.files);
  const uploadedFilePath = req.files.upload.path;
  let fileName = uploadedFilePath.split("\\").slice(-1).pop();
  res.json({
    uploaded: true,
    url: `http://localhost:4000/images/${fileName}`,
  });
});

app.listen(4000, () => {
  let p = `public\\images\\07Rl52xPbS9TobTwj4o3AOxQ.png`;
  console.log(p.split("\\").slice(-1).pop());
  console.log(`Running on port 4000`);
});

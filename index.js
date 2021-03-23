const express = require("express");
const formidable = require("formidable");
const { join } = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("/public"));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "/fileuploader/public/index.html"), (err) => {
    if (err) throw err;
  });
});

app.post("/", (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req);
    form.uploadDir = "/fileuploader/public/uploads/";
    form.keepExtensions = true;

    form.on("fileBegin", (name, file) => {
      file.path =
        __dirname +
        "/fileuploader/src/uploads/" +
        `${name}-${Date.now()}.${file.name.split(".")[1]}`;
    });

    form.on("file", (name, file) => {
      console.log("Uploaded file" + file.name);
      res.send(`${file.path}`);
    });
  } catch (error) {
    console.log("error");
    throw error;
  }
});

app.get("/uploads/:imagename", (req, res) => {
  res.sendFile(
    join(__dirname, "fileuploader/src/uploads", req.params.imagename)
  );
});

app.listen(PORT, () => {
  console.log("Server has started!");
});

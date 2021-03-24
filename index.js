const express = require("express");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

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

app.post("/upload", (req, res) => {
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
    path.resolve(
      __dirname,
      "fileuploader",
      "src",
      "uploads",
      req.params.imagename
    )
  );
});

if (process.env.NODE_ENV === "production") {
  //static file
  app.use(express.static("fileuploader/build"));

  //serve the static file

  app.get("*", (req, res) => {
    fs.readdir("fileuploader/src/uploads", (err, files) => {
      if (err) throw err;
      if (files) {
        files.forEach((file) => {
          fs.unlink(
            path.resolve(__dirname, "fileuploader", "src", "uploads", file),
            (err) => {
              if (err) throw err;
            }
          );
        });
      }
    });
    res.sendFile(
      path.resolve(__dirname, "fileuploader", "build", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log("Server has started!");
});

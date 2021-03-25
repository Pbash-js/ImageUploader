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
    form.keepExtensions = true;
    form.uploadDir = path.resolve(
      __dirname,
      "fileuploader",
      "public",
      "uploads"
    );
    form.on("fileBegin", (name, file) => {
      filepath = path.resolve(
        __dirname,
        "fileuploader",
        "public",
        "uploads",
        `newfile.${file.name.split(".")[1]}`
      );
      file.path = filepath;
    });

    form.on("file", (name, file) => {
      console.log("Uploaded file" + file.name);
      res.send(filepath);
    });
  } catch (error) {
    console.log("error");
    throw error;
  }
});

app.get("/uploads/:imagename", (req, res) => {
  try {
    res.sendFile(
      path.resolve(
        __dirname,
        "fileuploader",
        "public",
        "uploads",
        req.params.imagename
      )
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("*", (req, res) => {
  fs.readdir(
    path.resolve(__dirname, "fileuploader", "public", "uploads"),
    (err, files) => {
      if (err) throw err;
      if (files) {
        files.forEach((file) => {
          fs.unlink(
            path.resolve(__dirname, "fileuploader", "public", "uploads", file),
            (err) => {
              if (err) throw err;
            }
          );
        });
      }
    }
  );
  res.sendFile(path.resolve(__dirname, "fileuploader", "build", "index.html"));
});

if (process.env.NODE_ENV === "production") {
  //static file
  app.use(express.static("fileuploader/build"));

  app.post("/upload", (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req);
      form.keepExtensions = true;
      form.uploadDir = path.resolve(
        __dirname,
        "fileuploader",
        "build",
        "uploads"
      );
      form.on("fileBegin", (name, file) => {
        filepath = path.resolve(
          __dirname,
          "fileuploader",
          "build",
          "uploads",
          `newfile.${file.name.split(".")[1]}`
        );
        file.path = filepath;
      });

      form.on("file", (name, file) => {
        console.log("Uploaded file" + file.name);
        res.send(filepath);
      });
    } catch (error) {
      console.log("error");
      throw error;
    }
  });

  app.get("/uploads/:imagename", (req, res) => {
    try {
      res.sendFile(
        path.resolve(
          __dirname,
          "fileuploader",
          "build",
          "uploads",
          req.params.imagename
        )
      );
    } catch (error) {
      console.log(error);
    }
  });

  app.get("*", (req, res) => {
    fs.readdir(
      path.resolve(__dirname, "fileuploader", "build", "uploads"),
      (err, files) => {
        if (err) throw err;
        if (files) {
          files.forEach((file) => {
            fs.unlink(
              path.resolve(__dirname, "fileuploader", "build", "uploads", file),
              (err) => {
                if (err) throw err;
              }
            );
          });
        }
      }
    );
  });

  res.sendFile(path.resolve(__dirname, "fileuploader", "build", "index.html"));
}

app.listen(PORT, () => {
  console.log("Server has started!");
});

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

app.post("/upload", async (req, res) => {
  // try {
  //   fs.readdir(
  //     path.resolve(__dirname, "fileuploader", "build", "uploads"),
  //     (err, files) => {
  //       if (err) console.log(err);
  //       if (files) {
  //         files.forEach((file) => {
  //           fs.unlink(
  //             path.resolve(__dirname, "fileuploader", "build", "uploads", file),
  //             (err) => {
  //               if (err) console.log(err);
  //             }
  //           );
  //         });
  //       }
  //     }
  //   );
  // } catch (error) {
  //   res.send("server error");
  // }
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

    form.on("end", (name, file) => {
      console.log("Uploaded file" + file.name);
      res.send(filepath);
    });
  } catch (error) {
    console.log("error");
    res.send("error in uploading");
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
    res.send("error in getting uploads");
  }
});

if (process.env.NODE_ENV === "production") {
  //static file
  app.use(express.static("fileuploader/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "fileuploader", "build", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log("Server has started!");
});

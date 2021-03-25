import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import Loading from "./Loading";
import Uploaded from "./Uploaded";
const App = () => {
  const [progress, setProgress] = useState(0);
  const [imagePath, setImagePath] = useState("");

  return (
    <div className="App">
      <Grid
        justify="center"
        alignItems="center"
        container
        style={{ minHeight: "100vh" }}
      >
        {progress === 1 ? (
          <Uploaded imagePath={imagePath} />
        ) : progress === 0 ? (
          <UploadImage progress={setProgress} setImagePath={setImagePath} />
        ) : (
          <Loading progress={progress} />
        )}
      </Grid>
    </div>
  );
};

export default App;

import React, { useRef } from "react";
import { Typography, Grid, Paper, Box, Button } from "@material-ui/core";

const Uploaded = ({ imagePath }) => {
  if (imagePath.data) {
    var path = imagePath.data.split("/uploads/")[1];
    console.log(path);
  }

  const ref = useRef(null);
  const handleCopy = () => {
    ref.current.select();
    ref.current.setSelectionRange(0, 99999);

    document.execCommand("copy");
  };

  return (
    <Grid item>
      <Paper
        elevation={2}
        style={{
          minHeight: "60vh",
          minWidth: "500px",
          padding: "2rem 1rem",
          borderRadius: "1rem",
        }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4" align="center">
              ✅
            </Typography>
            <Typography variant="h5" align="center">
              Uploaded Successfully
            </Typography>
            <Box
              className="image-area"
              style={{
                minHeight: "300px",
                margin: "1rem",
                borderRadius: "1rem",
                border: "3px dashed rgba(20,20,200,0.3)",
                backgroundColor: "rgba(50,100,200,0.2)",
                backgroundImage: `url(./uploads/${path})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            ></Box>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center">
              Or
            </Typography>
          </Grid>
          <Grid container item justify="center">
            <input
              ref={ref}
              type="text"
              value={`${window.location.hostname}/uploads/${path}`}
              readOnly
            />
            <Button variant="contained" color="primary" onClick={handleCopy}>
              Copy Link
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Uploaded;

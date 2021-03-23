import React from "react";
import { Typography, Grid, Paper, Box, Button } from "@material-ui/core";
import DragToUpload from "./DropToUpload";
import handleUpload from "./handleUpload";

const UploadImage = ({ progress, setImagePath }) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const fileUploaded = e.target.files[0];
    handleUpload(fileUploaded, progress, setImagePath);
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
            <Typography variant="h5" align="center">
              Upload your image
            </Typography>
            <Typography variant="subtitle2" align="center">
              Jpeg or PNG
            </Typography>
            <DragToUpload>
              <Box
                className="image-area"
                style={{
                  minHeight: "300px",
                  margin: "1rem",
                  borderRadius: "1rem",
                  border: "3px dashed rgba(20,20,200,0.3)",
                }}
              >
                <Typography
                  variant="h5"
                  align="center"
                  style={{ marginTop: "50%" }}
                >
                  Drag and drop
                </Typography>
              </Box>
            </DragToUpload>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center">
              Or
            </Typography>
          </Grid>
          <Grid container item justify="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              type="file"
            >
              <form
                onSubmit={() => {
                  return false;
                }}
                encType="multipart/form-data"
              >
                <input
                  type="file"
                  name="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </form>
              Upload file
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default UploadImage;

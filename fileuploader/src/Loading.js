import React from "react";
import { Paper, Typography, LinearProgress } from "@material-ui/core";

const Loading = ({ progress }) => {
  return (
    <div>
      <Paper
        elevation={3}
        style={{
          minHeight: "20vh",
          minWidth: "500px",
          padding: "2rem 1rem",
          borderRadius: "1rem",
        }}
      >
        <Typography variant="h5" align="center">
          Uploading
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress * 100}
          style={{
            margin: "2rem",
          }}
        />
      </Paper>
    </div>
  );
};

export default Loading;

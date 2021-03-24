import React, { useEffect } from "react";
import handleUpload from "./handleUpload";

const DropToUpload = ({ children, progress, setImagePath }) => {
  const ref = React.createRef();

  useEffect(() => {
    let elem = ref.current;
    elem.addEventListener("dragenter", handleDragIn);
    elem.addEventListener("dragleave", handleDragOut);
    elem.addEventListener("dragover", handleDrag);
    elem.addEventListener("drop", handleDrop);
    return () => {
      elem.removeEventListener("dragenter", handleDragIn);
      elem.removeEventListener("dragleave", handleDragOut);
      elem.removeEventListener("dragover", handleDrag);
      elem.removeEventListener("drop", handleDrop);
    };
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const fileUploaded = e.dataTransfer.files[0];
    handleUpload(fileUploaded, progress, setImagePath);
  };

  return <div ref={ref}>{children}</div>;
};

export default DropToUpload;

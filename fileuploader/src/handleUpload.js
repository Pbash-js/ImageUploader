import axios from "axios";

const handleUpload = async (file, setProgress, setImagePath) => {
  try {
    var formData = new FormData();
    formData.append("image", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        setProgress(parseFloat(progressEvent.loaded / progressEvent.total));
      },
    };
    const res = await axios.post("/upload", formData, config);
    if (res.status === 200) setImagePath(res);
    console.log(res);
  } catch (error) {
    throw error;
  }
};

export default handleUpload;

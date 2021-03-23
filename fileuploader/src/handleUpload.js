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
    const res = await axios.post("http://localhost:5000/", formData, config);
    setImagePath(res);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default handleUpload;

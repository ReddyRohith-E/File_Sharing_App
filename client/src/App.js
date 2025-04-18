import { useEffect, useRef, useState } from "react";
import { uploadFile } from "./services/api";
import "./App.css";

function App() {
  const [file, setFile] = useState("");

  const [result, setResult] = useState("");
  const fileInputRef = useRef();

  const logo =
    "https://th.bing.com/th/id/OIP.bMIXHGF4UgcGACyqSUshTQHaNK?rs=1&pid=ImgDetMain";

  useEffect(() => {
    const getImage = async () => {
      if (!file) return; // Ensure file is valid before proceeding
  
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);
  
      try {
        let response = await uploadFile(data);
        setResult(response.path);
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    };
  
    getImage();
  }, [file]);
  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <img src={logo} alt="banner" />
      <div className="wrapper">
        <h1>Share your file here!!</h1>
        <p>Upload 📂 and share ➡️ the download link.</p>
        <button onClick={() => onUploadClick()}>Upload 📂</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target="_blank" rel="noopener noreferrer">
          {result}
        </a>
      </div>
    </div>
  );
}

export default App;

import React, { useRef, useState } from "react";

// Components
import Header from "./components/Header/Header.jsx";
import NetworkStatus from "./components/NetworkStatus/NetworkStatus.jsx";
import NetworkInfo from "./components/NetworkInfo/NetworkInfo.jsx";
import UploadButton from "./components/UploadButton/UploadButton.jsx";
import ProgressBar from "./components/ProgressBar/ProgressBar.jsx";
import FileResult from "./components/FileResult/FileResult.jsx";
import CopyMessage from "./components/CopyMessage/CopyMessage.jsx";
import SupportedFiles from "./components/SupportedFiles/SupportedFiles.jsx";

// Custom Hooks
import useFileUpload from "./hooks/useFileUpload.jsx";
import useNetworkStatus from "./hooks/useNetworkStatus.jsx";
import useCopyToClipboard from "./hooks/useCopyToClipboard.jsx";

// Styles
import "./App.css";

const App = () => {
  // State
  const [showNetworkInfo, setShowNetworkInfo] = useState(false);

  // Refs
  const fileInputRef = useRef(null);

  // Custom Hooks
  const {
    isUploading,
    uploadProgress,
    result,
    uploadFileHandler,
    resetUpload,
  } = useFileUpload();

  const { serverStatus, networkInfo, checkServerStatus, getServerIP } =
    useNetworkStatus();

  const { copyMessage, copyToClipboard } = useCopyToClipboard();

  // Event Handlers
  const handleUploadClick = () => {
    if (serverStatus.status === "error") {
      alert(
        "Server is not reachable. Please ensure the server is running and accessible."
      );
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      uploadFileHandler(selectedFile);
    }
  };

  const handleToggleNetworkInfo = () => {
    setShowNetworkInfo((prev) => !prev);
  };

  const handleRetryConnection = () => {
    resetUpload();
    checkServerStatus();
  };

  // Render
  return (
    <div className="container">
      <div className="background-overlay"></div>

      <main className="main-content">
        <div className="wrapper">
          <Header />

          <NetworkStatus
            serverStatus={serverStatus}
            showNetworkInfo={showNetworkInfo}
            onToggleNetworkInfo={handleToggleNetworkInfo}
          />

          {showNetworkInfo && (
            <NetworkInfo
              networkInfo={networkInfo}
              getServerIP={getServerIP}
              onCopyToClipboard={copyToClipboard}
            />
          )}

          <SupportedFiles />

          <CopyMessage message={copyMessage} isVisible={!!copyMessage} />

          <UploadButton
            onUploadClick={handleUploadClick}
            isUploading={isUploading}
            serverStatus={serverStatus}
            uploadProgress={uploadProgress}
          />

          <ProgressBar progress={uploadProgress} isVisible={isUploading} />

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.pdf,.txt,.doc,.docx,image/jpeg,image/png,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            aria-label="Select file to upload"
          />

          {result && (
            <FileResult
              result={result}
              onCopyToClipboard={copyToClipboard}
              onRetryConnection={handleRetryConnection}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;

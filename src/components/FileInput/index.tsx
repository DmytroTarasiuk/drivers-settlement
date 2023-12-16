import { useCallback, useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { AppType } from "../../types";
import { truncateFileName } from "../../utils";

import styles from "./styles.module.css";

interface IFileInput {
  onFileChange: (file: File) => void;
  type: AppType;
}

const FileInput = ({ onFileChange, type }: IFileInput) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState<File>();

  const getBorderColor = useCallback(() => {
    switch (type) {
      case AppType.BOLT:
        return "#45cd8b";
      case AppType.UBER:
        return "black";
      case AppType.FREENOW:
        return "#ca0928";
    }
  }, [type]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
    setFile(file);
  };

  return (
    <div
      style={{ background: `${getBorderColor()}` }}
      className={styles.inputContainer}
      onClick={() => {
        inputRef.current.click();
      }}
    >
      <div className={styles.uploadIcon}>
        <FileUploadIcon />
      </div>
      <input
        type="file"
        accept=".csv"
        hidden
        onChange={handleFileChange}
        ref={inputRef}
      />
      <span className={styles.title}>{type}</span>
      {file && <span>{truncateFileName(file.name, 25)}</span>}
    </div>
  );
};

export default FileInput;

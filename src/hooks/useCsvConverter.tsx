import { useState } from "react";

const useCsvConverter = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (file) => {
    setCsvFile(file);
  };

  const handleJsonConvert = (data) => {
    setJsonData(data);
  };

  return { csvFile, jsonData, handleFileChange, handleJsonConvert };
};

export default useCsvConverter;

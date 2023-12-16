import React from "react";
import Papa from "papaparse";

const CsvToJsonConverter = ({ csvFile, onJsonConvert }) => {
  const handleConvert = () => {
    Papa.parse(csvFile, {
      complete: (result) => {
        onJsonConvert(result.data);
      },
      header: true,
    });
  };

  return <button onClick={handleConvert}>Convert to JSON</button>;
};

export default CsvToJsonConverter;

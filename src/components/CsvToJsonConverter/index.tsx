import Button from "@mui/material/Button";
import Papa from "papaparse";

const CsvToJsonConverter = ({ csvFile, onJsonConvert }) => {
  const handleConvert = () => {
    Papa.parse(csvFile, {
      complete: (result) => {
        console.log(result);
        onJsonConvert(result.data);
      },
      header: true,
    });
  };

  return (
    <Button variant="outlined" color="primary" onClick={handleConvert}>
      Upload File
    </Button>
  );
};

export default CsvToJsonConverter;

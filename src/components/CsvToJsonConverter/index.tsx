import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import Papa from "papaparse";

const CsvToJsonConverter = ({ csvFile, onJsonConvert }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleConvert = () => {
    Papa.parse(csvFile, {
      complete: (result) => {
        onJsonConvert(result.data);
        if (result.data) {
          enqueueSnackbar("File was sucessfully uploaded", {
            variant: "success",
          });
        }
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

import { useMemo } from "react";
import Grid from "@mui/material/Grid";

import useCsvConverter from "../../hooks/useCsvConverter";
import { AppType } from "../../types";
import { fixSpellingMisstakes } from "../../utils";
import CsvToJsonConverter from "../CsvToJsonConverter";
import FileInput from "../FileInput";

import styles from "./styles.module.css";

const Dashboard = () => {
  const boltConfig = useCsvConverter();
  const uberConfig = useCsvConverter();
  const fnConfig = useCsvConverter();

  const combinedArray = useMemo(() => {
    if (boltConfig.jsonData && uberConfig.jsonData && fnConfig.jsonData) {
      return fnConfig.jsonData.map((obj1) => {
        const matchingObj2 = boltConfig.jsonData.find(
          (obj2) =>
            fixSpellingMisstakes(obj1["Kierowca"]?.toLowerCase()) ===
            fixSpellingMisstakes(obj2["Kierowca"]?.toLowerCase()),
        );

        const matchingObj3 = uberConfig.jsonData.find(
          (obj3) =>
            fixSpellingMisstakes(obj1["Kierowca"]?.toLowerCase()) ===
            `${obj3["Imię kierowcy"]?.toLowerCase()} ${obj3[
              "Nazwisko kierowcy"
            ]?.toLowerCase()}`,
        );

        return {
          ...obj1,
          ...matchingObj2,
          ...matchingObj3,
        };
      });
    }
  }, [uberConfig.jsonData, fnConfig.jsonData, boltConfig.jsonData]);

  console.log(combinedArray);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4} className={styles.item}>
          <FileInput
            type={AppType.BOLT}
            onFileChange={boltConfig.handleFileChange}
          />
          {boltConfig.csvFile && (
            <CsvToJsonConverter
              csvFile={boltConfig.csvFile}
              onJsonConvert={boltConfig.handleJsonConvert}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} className={styles.item}>
          <FileInput
            type={AppType.UBER}
            onFileChange={uberConfig.handleFileChange}
          />
          {uberConfig.csvFile && (
            <CsvToJsonConverter
              csvFile={uberConfig.csvFile}
              onJsonConvert={uberConfig.handleJsonConvert}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} className={styles.item}>
          <FileInput
            type={AppType.FREENOW}
            onFileChange={fnConfig.handleFileChange}
          />
          {fnConfig.csvFile && (
            <CsvToJsonConverter
              csvFile={fnConfig.csvFile}
              onJsonConvert={fnConfig.handleJsonConvert}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;

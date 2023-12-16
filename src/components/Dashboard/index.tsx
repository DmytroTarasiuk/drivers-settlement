import { useState } from "react";

import CsvToJsonConverter from "../CsvToJsonConverter";
import FileInput from "../FileInput";

const Dashboard = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (file) => {
    setCsvFile(file);
  };

  const handleJsonConvert = (data) => {
    setJsonData(data);
  };

  const array1 = [
    {
      "Identyfikator UUID kierowcy": "f17ad298-ae8d-4249-a030-547077e3ffeb",
      "Imię kierowcy": "Oleksandr",
      "Nazwisko kierowcy": "Yatskevych",
      "Wypłacono Ci": "131.92",
      "Wypłacono Ci : Twój przychód": "413.95",
      "Wypłacono Ci : Bilans przejazdu : Wypłaty : Odebrana gotówka": "-282.03",
      // ... other fields from the first object
    },
  ];

  const array2 = [
    {
      "ID kierowcy": "3059OY",
      Kierowca: "Oleksandr Yatskevych",
      // ... other fields from the second object
    },
  ];

  const array3 = [
    {
      Telefon: "48000000",
      Kierowca: "Oleksandr Yatskevych",
      // ... other fields from the third object
    },
  ];

  // Function to merge objects based on a common field
  function mergeObjects(obj1, obj2, obj3) {
    return {
      ...obj1,
      ...obj2,
      ...obj3,
    };
  }

  // Combine arrays based on specified condition
  const combinedArray = array1.map((obj1) => {
    const matchingObj2 = array2.find(
      (obj2) =>
        `${obj1["Imię kierowcy"]} ${obj1["Nazwisko kierowcy"]}` ===
        obj2["Kierowca"],
    );

    const matchingObj3 = array3.find(
      (obj3) =>
        `${obj1["Imię kierowcy"]} ${obj1["Nazwisko kierowcy"]}` ===
        obj3["Kierowca"],
    );

    return matchingObj2 && matchingObj3
      ? mergeObjects(obj1, matchingObj2, matchingObj3)
      : obj1;
  });

  console.log(combinedArray);

  console.log(
    combinedArray[0][
      "Wypłacono Ci : Bilans przejazdu : Wypłaty : Odebrana gotówka"
    ],
  );

  return (
    <div>
      <FileInput onFileChange={handleFileChange} />
      {csvFile && (
        <CsvToJsonConverter
          csvFile={csvFile}
          onJsonConvert={handleJsonConvert}
        />
      )}
      {jsonData && (
        <div>
          <h2>Converted JSON:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

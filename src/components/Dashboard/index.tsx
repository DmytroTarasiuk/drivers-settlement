import { useCallback, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";

import useCsvConverter from "../../hooks/useCsvConverter";
import { AppType } from "../../types";
import {
  fixSpellingMisstakes,
  getEmailValue,
  getPaymentType,
  removeSpecialChar,
  rentValues,
} from "../../utils";
import CsvToJsonConverter from "../CsvToJsonConverter";
import FileInput from "../FileInput";
import EnhancedTable from "../Table";

import DashboardTableCell, { IDashboardTableCell } from "./DashboardTableCell";
import { dashboardTableCells } from "./utils";

import styles from "./styles.module.css";

const Dashboard = () => {
  const boltConfig = useCsvConverter();
  const uberConfig = useCsvConverter();
  const fnConfig = useCsvConverter();

  const [adjustments, setAdjustments] = useState<Record<string, number>>({});
  const [rent, setRent] = useState<Record<string, number>>(rentValues);

  const memoizedAdjustments = useMemo(() => adjustments, [adjustments]);
  const memoizedRent = useMemo(() => rent, [rent]);

  const handleAdjustmentChange = useCallback(
    (id: string, value: number) => {
      setAdjustments((prevAdjustments) => {
        if (prevAdjustments[id] !== value) {
          return {
            ...prevAdjustments,
            [id]: value,
          };
        }
        return prevAdjustments;
      });
    },
    [setAdjustments],
  );

  const handleRentChange = useCallback(
    (id: string, value: number) => {
      setRent((prevRent) => {
        if (prevRent[id] !== value) {
          return {
            ...prevRent,
            [id]: value,
          };
        }
        return prevRent;
      });
    },
    [setRent],
  );

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

  const filteredArray = useMemo(() => {
    return combinedArray?.map((item) => {
      const name = item["Kierowca"];
      const profitBolt =
        +item["Wartość brutto"]?.replace(",", ".") -
          +item["Opłata Bolt"]?.replace(",", ".").substring(1) +
          +item["Opłata za anulowanie"]?.replace(",", ".") +
          +item["Napiwek"]?.replace(",", ".") || 0;
      const profitUber =
        +item["Wypłacono Ci : Twój przychód"] -
          +item["Wypłacono Ci:Twój przychód:Promocja:Program Quest"] || 0;

      const profitFn = +item["Suma zarobków"] - +item["Bonusy"] || 0;
      const vat = (profitBolt + profitUber + profitFn) * 0.08;
      const bonusBolt = +item["Bonus"]?.replace(",", ".") || 0;
      const bonusUber =
        +item["Wypłacono Ci:Twój przychód:Promocja:Program Quest"] || 0;
      const bonusFn = +item["Bonusy"] || 0;
      const vatBonus = (bonusBolt + bonusUber + bonusFn) * 0.23;
      const cashBolt =
        +removeSpecialChar(
          item["Przejazdy gotówkowe (przyjęta gotówka)"],
        )?.replace(",", ".") || 0;
      const cashUber =
        +removeSpecialChar(
          item["Wypłacono Ci : Bilans przejazdu : Wypłaty : Odebrana gotówka"],
        ) || 0;
      const cashFn = +item["Płatności gotówką/kartą"] || 0;
      const comission = profitBolt || profitUber || profitFn ? 40 : 0;
      const rentValue =
        rent && rent[item["ID kierowcy"]] !== 0 ? rent[item["ID kierowcy"]] : 0;
      const paymentType = getPaymentType(name);
      const email = getEmailValue(name);
      const adjustmentsValue =
        adjustments && adjustments[item["ID kierowcy"]] !== 0
          ? adjustments[item["ID kierowcy"]]
          : 0;

      const salary =
        profitBolt +
        bonusBolt -
        cashBolt +
        (profitUber + bonusUber - cashUber) +
        (profitFn + bonusFn - cashFn) -
        vat -
        vatBonus -
        comission -
        (rentValue || 0) +
        (adjustmentsValue || 0);
      return {
        id: item["ID kierowcy"],
        name,
        profitBolt: +profitBolt.toFixed(2),
        cashBolt,
        bonusBolt,
        profitUber: +profitUber.toFixed(2),
        cashUber,
        bonusUber,
        profitFn: +profitFn.toFixed(2),
        cashFn,
        bonusFn,
        vat: +vat.toFixed(2),
        vatBonus: +vatBonus.toFixed(2),
        comission,
        rent: rentValue,
        email,
        adjustments: adjustmentsValue,
        salary: +salary.toFixed(2),
        paymentType,
        actions: null,
      };
    });
  }, [combinedArray, adjustments, rent]);

  const dataToExport = filteredArray?.map((item) => {
    return {
      Kierowca: item.name,
      "Obrót Bolt": item.profitBolt,
      "Gotówka Bolt": item.cashBolt,
      "Bonus Bolt": item.bonusBolt,
      "Obrót Uber": item.profitUber,
      "Gotówka Uber": item.cashUber,
      "Bonus Uber": item.bonusUber,
      "Obrót Freenow": item.profitFn,
      "Gotówka Freenow": item.cashFn,
      "Bonus Freenow": item.bonusFn,
      VAT: item.vat,
      "VAT(Bonusy)": item.vatBonus,
      "Prowizja Karttell": item.comission,
      Wynajem: item.rent,
      Regulacja: item.adjustments,
      "Wyplata Kierowcy": item.salary,
    };
  });

  return (
    <>
      <Grid container spacing={3} className={styles.container}>
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
      {filteredArray && filteredArray.length ? (
        <EnhancedTable
          rows={filteredArray}
          headCells={dashboardTableCells}
          dataToExport={dataToExport}
          orderByField="salary"
          tableHeaderText="Rozliczenie Kierowcow"
          hideFieldsOnList={["id", "email"]}
          renderFilterFields={["name"]}
          tabelCellComponent={(props: IDashboardTableCell) => (
            <DashboardTableCell
              {...props}
              adjustment={memoizedAdjustments[props.row.id] || 0}
              rent={memoizedRent[props.row.id] || 0}
              onRentChange={(value) => {
                handleRentChange(props.row.id, value);
              }}
              onAdjustmentChange={(value) =>
                handleAdjustmentChange(props.row.id, value)
              }
            />
          )}
        />
      ) : null}
    </>
  );
};

export default Dashboard;

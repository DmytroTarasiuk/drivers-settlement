import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import REPORT_API, { IReport } from "../../api/reports";
import CustomModal from "../../modal";
import { showModalWithParams } from "../../redux/modal/actions";
import { CustomModalTypes } from "../../redux/modal/state";
import EnhancedTable from "../Table";

import ExportExcel from "./RaportExcelExport";
//import RaportForm from "./RaportForm";
import RaportTableCell, { IRaportTableCell } from "./RaportTableCell";
import { formatInputDate, raportTableCells } from "./utils";

const Raport = () => {
  const [reports, setReports] = useState<IReport[]>([]);
  const dispatch = useDispatch();
  let kwCounter = 0;
  let kpCounter = 0;

  const fetchReports = useCallback(() => {
    REPORT_API.getReports()
      .then((response) => {
        if (response) setReports(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const sortReportsByDate = (reports) => {
    return reports?.sort((a, b) => {
      const dateA = new Date(a.date.split(".").reverse().join("-"));
      const dateB = new Date(b.date.split(".").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    });
  };

  const addIndexesToReports = (sortedArray) => {
    return sortedArray?.map((item, index) => {
      return {
        idx: index + 1,
        date: item.date,
        symbol: item.symbol,
        description: item.description,
        income: item.income,
        cost: item.cost,
        actions: null,
        ...item,
      };
    });
  };

  const onAddReport = useCallback(() => {
    dispatch(
      showModalWithParams({
        modalType: CustomModalTypes.ADD_REPORT,
        params: {
          refreshOnCLose: true,
          refetch: fetchReports,
        },
      }),
    );
  }, [dispatch, fetchReports]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const sortedReports = useMemo(() => sortReportsByDate(reports), [reports]);
  const reportsWithIndexes = useMemo(
    () => addIndexesToReports(sortedReports),
    [sortedReports],
  );

  const finalData = reportsWithIndexes.map((item: IReport) => {
    if (item.symbol === "KW") {
      kwCounter++;
    } else if (item.symbol === "KP") {
      kpCounter++;
    }

    return {
      ...item,
      ...(item.symbol === "KW" && { kwCounter }),
      ...(item.symbol === "KP" && { kpCounter }),
    };
  });

  const dataToExport = finalData?.map((item) => {
    return {
      Lp: item.idx,
      Data: item.date,
      "Dowód Symbol Nr":
        item.symbol === "KW"
          ? item.symbol +
            "(" +
            item.kwCounter +
            "/" +
            formatInputDate(item.date).slice(3) +
            ")"
          : item.symbol +
            "(" +
            item.kpCounter +
            "/" +
            formatInputDate(item.date).slice(3) +
            ")",
      Treść: item.description,
      Przychód: item.income,
      Rozchód: item.cost,
    };
  });

  return (
    <>
      <ExportExcel exportData={dataToExport} />
      <EnhancedTable
        rows={finalData}
        headCells={raportTableCells}
        onAdd={onAddReport}
        orderType="asc"
        tableHeaderText="Faktury"
        enableDownload={false}
        dataToExport={dataToExport}
        orderByField="idx"
        hideFieldsOnList={["_id", "__v", "kwCounter", "kpCounter"]}
        renderFilterFields={["date", "symbol"]}
        tabelCellComponent={(props: IRaportTableCell) => (
          <RaportTableCell {...props} refetch={fetchReports} />
        )}
      />
      <CustomModal />
    </>
  );
};

export default Raport;

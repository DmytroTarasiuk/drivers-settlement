import { useCallback, useEffect, useMemo, useState } from "react";

import REPORT_API, { IReport } from "../../api/reports";
import EnhancedTable from "../Table";

import RaportForm from "./RaportForm";
import RaportTableCell, { IRaportTableCell } from "./RaportTableCell";
import { raportTableCells } from "./utils";

const Raport = () => {
  const [reports, setReports] = useState<IReport[]>([]);

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

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const sortedReports = useMemo(() => sortReportsByDate(reports), [reports]);
  const reportsWithIndexes = useMemo(
    () => addIndexesToReports(sortedReports),
    [sortedReports],
  );

  return (
    <>
      <RaportForm callback={fetchReports} />
      <EnhancedTable
        rows={reportsWithIndexes}
        headCells={raportTableCells}
        orderType="asc"
        tableHeaderText="Faktury"
        orderByField="idx"
        hideFieldsOnList={["_id", "__v"]}
        //renderFilterFields={["date"]}
        tabelCellComponent={(props: IRaportTableCell) => (
          <RaportTableCell {...props} refetch={fetchReports} />
        )}
      />
    </>
  );
};

export default Raport;

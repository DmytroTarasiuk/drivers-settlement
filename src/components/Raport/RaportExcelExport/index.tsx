import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

interface IExportExcel {
  exportData?: any[];
}

const ExportExcel = ({ exportData }: IExportExcel) => {
  const tableRef = useRef(null);

  return (
    <div>
      <DownloadTableExcel
        filename="raport ksiegowy"
        sheet="users"
        currentTableRef={tableRef.current}
      >
        <button> Export excel </button>
      </DownloadTableExcel>

      <table ref={tableRef} style={{ display: "none" }}>
        <tbody>
          {/* <tr aria-rowspan={2}>
            <th>Lp.</th>
            <th>Data</th>
            <th>Dowód Symbol Numer</th>
            <th>Treść</th>
            <th>Przychód</th>
            <th>Rozchód</th>
          </tr> */}
          {exportData?.map((item) => (
            <tr>
              <td style={{ background: "rgba(255,255,204,255)" }}>
                {item["Lp"]}
              </td>
              <td colSpan={3} style={{ background: "rgba(255,255,204,255)" }}>
                {item["Data"]}
              </td>
              <td colSpan={3} style={{ background: "rgba(255,255,204,255)" }}>
                {item["Dowód Symbol Nr"]}
              </td>
              <td colSpan={9} style={{ background: "rgba(255,255,204,255)" }}>
                {item["Treść"]}
              </td>
              <td colSpan={4} style={{ background: "rgba(255,255,204,255)" }}>
                {item["Przychód"]}
              </td>
              <td colSpan={4} style={{ background: "rgba(255,255,204,255)" }}>
                {item["Rozchód"]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExportExcel;

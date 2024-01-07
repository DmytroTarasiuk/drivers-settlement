const isReportInRange = (report: any, startDate: string, endDate: string) => {
  const [day, month, year] = report.date.split(".");
  const reportDate = new Date(`${year}-${month}-${day}`);

  return reportDate >= new Date(startDate) && reportDate <= new Date(endDate);
};

export const filterData = (data: any[], filters: {}, searchText: string) => {
  let filteredData = data.filter((row) =>
    Object.keys(filters).every((key) => {
      switch (key) {
        case "date":
          const startDate = filters[key]?.start_date;
          const endDate = filters[key]?.end_date;
          return isReportInRange(row, startDate, endDate);
        default:
          return filters[key].length === 0 || filters[key].includes(row[key]);
      }
    }),
  );

  if (searchText !== "") {
    filteredData = filteredData.filter((row) =>
      Object.keys(row).some(
        (key) =>
          row[key] &&
          row[key]
            .toString()
            .toLowerCase()
            .indexOf(searchText?.toLowerCase()) !== -1,
      ),
    );
  }

  return filteredData;
};

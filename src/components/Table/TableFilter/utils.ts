const isReportInRange = (report: any, startDate: string, endDate: string) => {
  const dateParts = report?.date?.split(".");

  if (!dateParts || dateParts.length !== 3) {
    console.error("Invalid date format in report:", report);
    return null;
  }

  const [day, month, year] = dateParts;

  if (!day || !month || !year) {
    console.error("Invalid date components in report:", report);
    return null;
  }

  const reportDate = new Date(`${year}-${month}-${day}`);

  if (isNaN(reportDate.getTime())) {
    console.error("Invalid date value in report:", report);
    return null;
  }

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
    console.error("Invalid start or end date:", startDate, endDate);
    return null;
  }

  return reportDate >= startDateObj && reportDate <= endDateObj;
};

export const filterData = (data: any[], filters: {}, searchText: string) => {
  let filteredData = (data || []).filter((row) =>
    (Object.keys(filters) || []).every((key) => {
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
    filteredData = filteredData?.filter((row) =>
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

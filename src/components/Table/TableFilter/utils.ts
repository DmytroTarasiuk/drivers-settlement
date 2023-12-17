export const filterData = (data: any[], filters: {}, searchText: string) => {
  let filteredData = data.filter((row) =>
    Object.keys(filters).every((key) => {
      switch (key) {
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

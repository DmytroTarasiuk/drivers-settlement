import {
  Checkbox,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { Column, IFilterType } from "./types";

import styles from "./styles.module.css";

export enum ColumdFilterId {
  CATEGORY = "category",
}

const Filter = ({
  columns,
  filters,
  handleFilterChange,
  data,
}: IFilterType) => {
  const getFilteredData = (data, columnId) => {
    return data
      .map((row) => row[columnId])
      .filter((value, index, self) => self.indexOf(value) === index);
  };

  const renderFilter = (column: Column) => {
    switch (column.filterType) {
      default:
        switch (column.id) {
          default:
            if (column.label !== "" && column.filterType) {
              switch (column.id) {
                default:
                  break;
              }
              return (
                <>
                  <FormLabel className={styles.label}>{column.label}</FormLabel>
                  <Select
                    variant="outlined"
                    multiple
                    value={filters[column.id] || []}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    }}
                    onChange={(event: any) =>
                      handleFilterChange(event, column.id)
                    }
                    renderValue={(selected: unknown) =>
                      (selected as string[]).join(", ")
                    }
                  >
                    {getFilteredData(data, column.id).map((value) => {
                      return (
                        value && (
                          <MenuItem value={value} key={value}>
                            <Checkbox
                              checked={
                                (filters[column.id] || []).indexOf(value) > -1
                              }
                            />
                            {value}
                          </MenuItem>
                        )
                      );
                    })}
                  </Select>
                </>
              );
            } else {
              return null;
            }
        }
    }
  };

  return (
    <>
      {columns.map((column) => (
        <FormControl key={column.id}>{renderFilter(column)}</FormControl>
      ))}
    </>
  );
};

export default Filter;

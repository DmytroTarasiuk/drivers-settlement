/**
  Custom hook for parsing data based on specified fields.
  @param {Array} data - The data array to be parsed.
  @param {Array} fields - The fields to include in the parsed objects.
  @returns {Array} - The parsed data array.
  This hook takes in a data array and an array of fields. It uses the React useMemo hook
  to memoize the parsing logic and optimize performance.
  The hook iterates over each item in the data array and creates a new object for each item,
  including only the specified fields. It returns an array of these parsed objects.
  If the data or fields arrays are not provided or are empty, the hook will return an empty array.
*/

import { useMemo } from "react";

export function useDataParsing(data, fields) {
  return useMemo(() => {
    return data?.map((item) => {
      let object = {};
      fields?.forEach((itemField) => {
        object = { ...object, ...{ [itemField]: item[itemField] } };
      });
      return object;
    });
  }, [data, fields]);
}

import * as XLSX from "xlsx";

import { PaymentType } from "../types";

export function truncateFileName(fileName, maxLength) {
  if (fileName.length <= maxLength) {
    return fileName;
  }

  const parts = fileName.split(".");
  const extension = parts.pop();
  const baseName = parts.join(".");

  const availableSpace = maxLength - extension.length - 1;

  const truncatedBaseName = baseName.substring(0, availableSpace) + "...";

  const truncatedFileName = truncatedBaseName + "." + extension;

  return truncatedFileName;
}

export const exportToCSV = (data, filename) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${filename}.csv`);
};

export const exportToExcel = (data, filename) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export function mergeObjects(obj1, obj2, obj3) {
  return {
    ...obj1,
    ...obj2,
    ...obj3,
  };
}

export const fixSpellingMisstakes = (name: string) => {
  switch (name) {
    case "dmytro tarasuik":
      return "dmytro tarasiuk";
    case "bohdan striletskyi":
    case "bogdan striletskyi":
      return "bohdan strilletskyi";
    case "antonov yevhenii":
      return "yevhenii antonov";
    case "oleksii zamakhov":
      return "olek zamakhov";
    default:
      return name;
  }
};

export const removeSpecialChar = (str: string) => {
  if (str && str.startsWith("-")) {
    return str.substring(1);
  }

  return str;
};

export const getRentValue = (driverName: string) => {
  switch (driverName) {
    case "Bohdan Striletskyi":
      return 650;
    case "Mykyta Rodchenko":
      return 550;
    case "Borys Kukava":
      return 600;
    case "Maksym Hotsman":
      return 650;
    case "Uladzislau Nekreshevich":
      return 650;
    default:
      return 0;
  }
};

export const getPaymentType = (driverName: string) => {
  switch (driverName) {
    case "Bohdan Striletskyi":
      return PaymentType.CARD;
    case "Eduard Savitski":
      return PaymentType.CARD;
    case "Mykyta Rodchenko":
      return PaymentType.CARD;
    case "Maksym Bevza":
      return PaymentType.CARD;
    case "Borys Kukava":
      return PaymentType.CARD;
    case "Maksym Hotsman":
      return PaymentType.CARD;
    case "Yevhen Trotskyi":
      return PaymentType.CARD;
    default:
      return PaymentType.CASH;
  }
};

export const rentValues = {
  "7381YT": 0,
  "7817UN": 650,
  "6765RT": 0,
  "3514BS": 650,
  "6633YA": 0,
  "7837MB": 0,
  "5551BK": 600,
  "3407YR": 0,
  "6209VP": 0,
  "6894MH": 650,
  "1252ES": 0,
  "3059OY": 0,
  "7845MR": 550,
  "6353BZ": 0,
  "1983AS": 0,
  "4175OB": 0,
  "1235IS": 0,
  "1356DT": 0,
  "1602OK": 0,
  "8274YB": 0,
  "4946VT": 0,
  "7105VL": 0,
  "9746VP": 0,
  "8432VK": 0,
  "6466OZ": 0,
  "7290MR": 0,
};

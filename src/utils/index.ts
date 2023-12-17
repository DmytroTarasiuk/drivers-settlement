import * as XLSX from "xlsx";

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
    case "Uladzislau Nekrashevich":
      return 650;
    default:
      return 0;
  }
};

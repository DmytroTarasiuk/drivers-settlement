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

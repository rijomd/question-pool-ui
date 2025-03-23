import queryString from "query-string";

export const objectToParams = (filter) => {
  const data = {};
  for (let item in filter) {
    if (
      filter.hasOwnProperty(item) &&
      filter[item] !== "" &&
      filter[item] !== 0
    ) {
      data[item] = filter[item];
    }
  }
  if (Array.isArray(data.id_list)) {
    data.id_list = `${data.id_list.join(",")}`;
  }
  return queryString.stringify(data);
};

export function numberToAlphabet(options, type = "text") {
  if (type === "object") {
    for (let item in options) {
      options[String.fromCharCode(64 + Number(item))] = options[item];
      delete options[item];
    }
    return { options: options };
  } else {
    return String.fromCharCode(64 + Number(options));
  }
}

export function alphabetToNumber(options, type) {
  if (type === "object") {
    for (let item in options) {
      if (typeof item === "number") {
        return item;
      } else {
        options[item.toUpperCase().charCodeAt(0) - 64] = options[item];
        delete options[item];
      }
    }
    console.log(options, "options 123");
    return options;
  } else {
    return options.toUpperCase().charCodeAt(0) - 64;
  }
}

export const dataToFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data?.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

export const stringToKeyValuePair = (string) => {
  const regex = /(\w)\s*:\s*"([^"]+)"/g;
  let match;
  const options = {};

  while ((match = regex.exec(string)) !== null) {
    const key = match[1];
    const value = match[2];
    options[key] = value;
  }
  return options;
};

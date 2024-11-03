import queryString from 'query-string';

export const objectToParams = (filter) => {
    const data = {};
    for (let item in filter) {
        if (filter[item] != "" || filter[item] != 0) {
            data[item] = filter[item];
        }
    }
    return queryString.stringify(data);
}

export function numberToAlphabet(options, type = "text") {
    if (type === "object") {
        for (let item in options) {
            options[String.fromCharCode(64 + Number(item))] = options[item];
            delete options[item];
        }
        return { options: options };
    }
    else {
        return String.fromCharCode(64 + Number(options));
    }
}

export function alphabetToNumber(options, type) {
    if (type === "object") {
        for (let item in options) {
            if (typeof item === "number") {
                return item;
            }
            else {
                options[item.toUpperCase().charCodeAt(0) - 64] = options[item];
                delete options[item];
            }
        }
        console.log(options, "options 123");
        return options;
    }
    else {
        return options.toUpperCase().charCodeAt(0) - 64;
    }
}

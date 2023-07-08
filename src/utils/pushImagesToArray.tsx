import convertUrlsToJSON from "./convertUrlsToJSON";

const pushImagesToArray = (stringArray: string) => {
    let array: string[] = [];
    for ( let i = 0; i < stringArray.length; i ++ ) {
        const url: string = convertUrlsToJSON(stringArray[i]);
        array.push(url);
    };
    return array;
};

export { pushImagesToArray }
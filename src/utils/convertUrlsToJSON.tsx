const convertUrlsToJSON = (string: string) => {
    return JSON.parse(string).publicUrl
}

export default convertUrlsToJSON;
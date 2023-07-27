function camelCaseToTextCase(camelCaseString: string) {
    const result: string = camelCaseString.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1) as string;
};

export default camelCaseToTextCase;
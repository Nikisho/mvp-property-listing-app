function isPositiveNumberLessThanN(number: number, N: number): boolean {
    if (number < 0 || number > N) return false;
    return true;
}

export default isPositiveNumberLessThanN;
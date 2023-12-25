/**
 *
 * @param numb
 * @param frontZeros
 * @param backZeros
 * @example
 * fillZeros(2, 2) // "02"
 * fillZeros(2.2, 2) // "02.2"
 * fillZeros(2.2, 2) // "02.2"
 * fillZeros(2.2, 2, 2) // "02.20"
 * fillZeros(2.2, 0, 2) // "2.20"
 */
export default function fillZeros(numb: number, frontZeros: number, backZeros: number = 0): string {
    const numbString: string = Number(numb).toString()

    if (!Number.isInteger(numb) || backZeros > 0) {
        const numbSplitt: string[] = (backZeros > 0)
            ? numb.toFixed(backZeros).split(".")
            : numbString.split(".")
        return `${fillZeros(parseInt(numbSplitt[0], 10), frontZeros)}.${numbSplitt[1]}`
    }

    const deltaZeros: number = frontZeros - numbString.length
    const preZeros: string =  (deltaZeros > 0)
        ? Array.from({length: deltaZeros}, () :string => "0").join("")
        : ""
    return `${preZeros}${numb}`
}
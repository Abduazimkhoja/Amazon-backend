export function convertToNumber(input: string): number | undefined {
	const number = Number(input)
	return isNaN(number) ? undefined : number
}

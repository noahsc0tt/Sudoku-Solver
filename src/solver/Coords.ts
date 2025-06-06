export default class Coords {
    readonly row: number
    readonly column: number
    static readonly BOX_DIMENSION: number = 3

    constructor(row: number, column: number) {
        if (row < 0 || row > 8 || column < 0 || column > 8)
            throw new RangeError("Invalid sudoku coordinates")
        this.row = row
        this.column = column
    }

    public equals(otherCoords: Coords): boolean {
        return (
            this.row === otherCoords.row && this.column === otherCoords.column
        )
    }

    public toString(): string {
        return `${this.row},${this.column}`
    }

    public static fromString(str: string): Coords {
        return new Coords(parseInt(str[0]), parseInt(str[2]))
    }

    public static getBox(coords: Coords): number
    public static getBox(row: number, column: number): number
    public static getBox(
        coordsOrRow: Coords | number,
        column?: number
    ): number {
        let row: number

        if (coordsOrRow instanceof Coords) {
            column = coordsOrRow.column
            row = coordsOrRow.row
        } else row = coordsOrRow

        const boxColumn: number = Math.floor(column! / this.BOX_DIMENSION)
        const boxRow: number = Math.floor(row / this.BOX_DIMENSION)

        return boxColumn + 3 * boxRow
    }
}
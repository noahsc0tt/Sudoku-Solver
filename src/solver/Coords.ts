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
        let [row, column] = str.split(',').map(Number)
        return new Coords(row, column)
    }

    public static getBox(coords: Coords): number {
        const boxColumn: number = Math.floor(coords.column! / this.BOX_DIMENSION)
        const boxRow: number = Math.floor(coords.row / this.BOX_DIMENSION)
        return boxColumn + 3 * boxRow
    }
}
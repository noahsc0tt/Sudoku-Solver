export class Coords {
    readonly row: number
    readonly column: number

    constructor(row: number, column: number) {
        if (row<0 || row>8 || column<0 || column>8) 
            throw new RangeError("Invalid sudoku coordinates")
        this.row = row 
        this.column = column
    }

    public static getBox(row: number, column: number): number
    public static getBox(coordsOrRow: Coords | number, column?: number): number {
        let coords = typeof coordsOrRow === "number" ? new Coords(coordsOrRow, column!) : coordsOrRow
        let x: number = Math.floor(coords.column/3)
        let y: number = Math.floor(coords.row/3)

        return x + 3*y
    }
}
export class Cell {
    readonly coords: Coords
    readonly value: number

    constructor(value:number, coords: Coords)
    constructor(value: number, row: number, column: number)
    constructor(value: number, coordsOrRow: Coords | number, column?: number) {
        this.coords = coordsOrRow instanceof Coords ? coordsOrRow : new Coords(coordsOrRow, column!)
        this.value = value
    }
}
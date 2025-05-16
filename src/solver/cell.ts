export class Coords {
    readonly row: number
    readonly column: number

    constructor(row: number, column: number) {
        if (row<0 || row>8 || column<0 || column>8) 
            throw new RangeError("Invalid sudoku coordinates")
        this.row = row 
        this.column = column
    }
}

export class Cell {
    readonly value: number
    readonly coords: Coords

    constructor(value: number, coords: Coords) {
        this.value = value
        this.coords = coords
    }
}
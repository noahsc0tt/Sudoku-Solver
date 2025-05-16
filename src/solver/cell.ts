export class Coords {
    readonly row: number
    readonly column: number

    public constructor(row: number, column: number) {
        if (row<0 || row>8 || column<0 || column>8) 
            throw new RangeError("Invalid sudoku coordinates")
        this.row = row 
        this.column = column
    }
}

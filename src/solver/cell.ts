export class Coords {
    readonly row: number
    readonly column: number

    public constructor(column: number, row: number) {
        if (!(column>=1 && row<=9) && !(row>=1 && row<=9)) 
            throw new RangeError("Invalid sudoku coordinates")
        this.row = row 
        this.column = column
    }
}

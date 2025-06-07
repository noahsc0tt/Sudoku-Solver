import Coords from './Coords'

export default class Cell {
    readonly coords: Coords
    readonly value: number

    constructor(value: number, coords: Coords)
    constructor(value: number, row: number, column: number)
    constructor(value: number, coordsOrRow: Coords | number, column?: number) {
        this.coords =
            coordsOrRow instanceof Coords
                ? coordsOrRow
                : new Coords(coordsOrRow, column!)
        this.value = value
    }

    public static createCellArray(...cellInputs: [number, number, number][]): Cell[] {
        return cellInputs.map(([val, row, col]) => new Cell(val, row, col))
    }

    public static createRowCellArray(row: number[], rowIndex: number): Cell[] {
        return row.map((val, colIndex) => new Cell(val, rowIndex, colIndex))
    }
}

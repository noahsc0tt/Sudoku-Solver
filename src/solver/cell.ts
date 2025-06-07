import Coords from "./Coords"
import SudokuError from "./SudokuError"

export default class Cell {
    readonly coords: Coords
    readonly value: number

    constructor(value: number, coords: Coords)
    constructor(value: number, row: number, column: number)
    constructor(value: number, coordsOrRow: Coords | number, column?: number) {
        if (value < 1 || value > 9) throw new SudokuError("Invalid cell value")
        this.value = value
        this.coords =
            coordsOrRow instanceof Coords
                ? coordsOrRow
                : new Coords(coordsOrRow, column!)
    }
}

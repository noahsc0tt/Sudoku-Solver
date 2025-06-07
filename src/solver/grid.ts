import Cell from "./Cell.ts"
import GridUtils from "./GridUtils.ts"
import SudokuError from "./SudokuError.ts"

export class Grid {
    static readonly digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    static readonly DIMENSION: number = Grid.digits.length
    public grid: number[][]
    public filled: number
    readonly givenCells: Cell[]
    readonly EMPTY_VALUE: number = 0
    
    constructor(cells: Cell[]) {
        if (!GridUtils.cellsValid(cells)) throw new SudokuError("Cell inputs violate sudoku rules")
        this.givenCells = cells
        this.grid = Array.from({length: Grid.DIMENSION}, () => Array(Grid.DIMENSION).fill(this.EMPTY_VALUE))
        cells.forEach(cell =>
            this.grid[cell.coords.row][cell.coords.column] = cell.value 
        )
        this.filled = 0
    }

    public rowConsistentWithGivenCells(row: number[], rowIndex: number): boolean {
        return this.givenCells.every(cell => 
            (cell.coords.row === rowIndex) === (row[cell.coords.column] === cell.value)
        )
    }

    public printGrid(): void {
        this.grid.forEach(row => console.log(row))
    }
}
import Cell from "./Cell"
import Coords from "./Coords"
import SudokuError from "./SudokuError"

export interface ValueLocations {
    rows: number[]
    columns: number[]
    boxes: number[]
}

export default class GridUtils {
    static readonly digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    static readonly DIMENSION: number = GridUtils.digits.length

    public static rowConsistentWithCells(row: number[], rowIndex: number, cells: Cell[]): boolean {
        return cells.every(cell => 
            (cell.coords.row === rowIndex) === (row[cell.coords.column] === cell.value)
        )
    }

    public static cellsValid(cells: Cell[]): boolean {
        const valueLocationsMap: Map<number, ValueLocations> = new Map()
        let sameValueLocations: ValueLocations

        cells.forEach((cell) => {
            if (!valueLocationsMap.has(cell.value))
                valueLocationsMap.set(cell.value, {
                    rows: [],
                    columns: [],
                    boxes: [],
                })
            sameValueLocations = valueLocationsMap.get(cell.value)!
            sameValueLocations.rows.push(cell.coords.row)
            sameValueLocations.columns.push(cell.coords.column)
            sameValueLocations.boxes.push(Coords.getBox(cell.coords))
        })

        for (const [_, locations] of valueLocationsMap.entries()) {
            if (
                locations.rows.length !== new Set(locations.rows).size ||
                locations.columns.length !== new Set(locations.columns).size ||
                locations.boxes.length !== new Set(locations.boxes).size
            )
                return false
        }
        return true
    }

    public static createCellArray(
        ...cellInputs: [number, number, number][]
    ): Cell[] {
        return cellInputs.map(([val, row, col]) => new Cell(val, row, col))
    }

    public static createRowCellArray(row: number[], rowIndex: number): Cell[] {
        return row.map((val, colIndex) => new Cell(val, rowIndex, colIndex))
    }

    public static createGrid(cells: Cell[]): number[][] {
        if (!GridUtils.cellsValid(cells))
            throw new SudokuError("Cell inputs violate sudoku rules")
        if (cells.length !== GridUtils.DIMENSION*GridUtils.DIMENSION)
            throw new TypeError("Not enough cells provided")
            
        const grid: number[][] = Array.from({ length: GridUtils.DIMENSION }, () =>
            Array(GridUtils.DIMENSION).fill(-1)
        )
        cells.forEach(
            cell => {
                    if (grid[cell.coords.row][cell.coords.column] !== -1)
                        throw new SudokuError("Conflicting cell values given")
                    grid[cell.coords.row][cell.coords.column] = cell.value
            }
        )
        return grid
    }
}

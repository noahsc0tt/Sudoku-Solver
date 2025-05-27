import { Cell, Coords } from "./Cell.ts"
import SudokuError from "./SudokuError.ts"

export interface ValueLocations {
    rows: number[]
    columns: number[]
    boxes: number[]
}

export class Grid {
    static readonly digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    static readonly DIMENSION: number = Grid.digits.length
    public grid: number[][]
    public filled: number
    readonly givenCells: Cell[]
    readonly EMPTY_VALUE: number = 0
    
    constructor(cells: Cell[]) {
        if (!Grid.cellsValid(cells)) throw new SudokuError("Cell inputs violate sudoku rules")
        this.givenCells = cells
        this.grid = Array.from({length: Grid.DIMENSION}, () => Array(Grid.DIMENSION).fill(this.EMPTY_VALUE))
        cells.forEach(cell =>
            this.grid[cell.coords.row][cell.coords.column] = cell.value 
        )
        this.filled = 0
    }

    public static createCellArray(...cellInputs: [number, number, number][]): Cell[] {
        return cellInputs.map(([val, row, col]) => new Cell(val, row, col))
    }

    public static createRowCellArray(row: number[], rowIndex: number): Cell[] {
        return row.map((val, colIndex) => new Cell(val, rowIndex, colIndex))
    }

    public setRow(rowIndex: number, row: number[]) {
        if (rowIndex < 0 || rowIndex >= this.grid.length)
            throw new RangeError("Row index out of range")
        this.grid[rowIndex] = row
    }

    public setGrid(grid: number[][]) {
        if (grid.length !== Grid.DIMENSION || grid.some(row => row.length !== Grid.DIMENSION))
            throw new TypeError("Incompatible grid dimensions")
        this.grid = grid
    }

    public static cellsValid(cells: Cell[]): boolean {
        const valueLocationsMap: Map<number, ValueLocations> = new Map()
        let sameValueLocations: ValueLocations

        cells.forEach(cell => {
            if (!valueLocationsMap.has(cell.value)) valueLocationsMap.set(cell.value, { rows: [], columns: [], boxes: []})
            sameValueLocations = valueLocationsMap.get(cell.value)!
            sameValueLocations.rows.push(cell.coords.row)
            sameValueLocations.columns.push(cell.coords.column)
            sameValueLocations.boxes.push(Coords.getBox(cell.coords))
        })
        
        for (const [_, locations] of valueLocationsMap.entries()) { 
            if (locations.rows.length !== (new Set(locations.rows)).size
            || locations.columns.length !== (new Set(locations.columns)).size
            || locations.boxes.length !== (new Set(locations.boxes)).size)
                return false
        }
        return true
    }

    public rowConsistentWithGivenCells(row: number[], rowIndex: number): boolean {
        return this.givenCells.every(cell => 
            (cell.coords.row === rowIndex) === (row[cell.coords.column] === cell.value)
        )
    }

    public consistentWithGivenCells(): boolean {
        return this.grid.every((row, rowIndex) => this.rowConsistentWithGivenCells(row, rowIndex))
    }

    public rowsValid(): boolean {
        return this.grid.every(row => {
            for(let n=1; n<=Grid.DIMENSION; n++) if (!row.includes(n)) return false
            return true
        })
    }
    
    public columnsValid(): boolean {
        for(let col=0; col<Grid.DIMENSION; col++) {
            for(let n=1; n<=Grid.DIMENSION; n++) {
                if (!this.grid.some(row => row[col] === n )) return false
            }
        }
        return true
    }

    private boxesValid(): boolean {
        const boxValuesMap: Map<number, number[]> = new Map()
        let box: number
        
        this.grid.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
                box = Coords.getBox(rowIndex, columnIndex)
                if (!boxValuesMap.has(box)) boxValuesMap.set(box, [])
                boxValuesMap.get(box)!.push(value)
            })
        })

        for (const [_, values] of boxValuesMap.entries())
            if ((new Set(values)).size !== Grid.DIMENSION) return false
        
        return true
    }

    
    public isValid(): boolean { 
        return this.columnsValid() && this.rowsValid() && this.boxesValid() 
    }
    
    public printGrid(): void {
        this.grid.forEach(row => console.log(row))
    }
}
import { Cell } from "./cell.ts"

export class Grid {
    private grid: number[][]
    
    constructor(cells: Cell[]) {
        this.grid = Array.from({length: 9}, () => Array(9).fill(-1))
        cells.forEach(cell => { this.grid[cell.coords.row][cell.coords.column] = cell.value })
    }
    public static createCellArray(...cellInputs: [number, number, number][]): Cell[] {
        return cellInputs.map(([val, row, col]) => new Cell(val, row, col))
    }
}

    

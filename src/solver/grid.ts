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
    
    public rowsValid(): boolean {
        return this.grid.every(row => {
            for(let i=1; i<=9; i++) if (!row.includes(i)) return false
            return true
        })
    }
    
    public columnsValid(): boolean {
        
        for(let n=1; n<=9; n++) {
            for(let col=0; col<9; col++) {
                if (!this.grid.some(row => row[col] === n )) return false
            }
        }
        return true
    }

    public isValid(): boolean { return this.columnsValid() && this.rowsValid() }
    
    public printGrid(): void {
        this.grid.forEach(row => console.log(row))
    }
}


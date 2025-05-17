import { Cell } from "./cell.ts"

export class Grid {
    private grid: number[][]
    
    constructor(cells: Cell[]) {
        this.grid = Array.from({length: 9}, () => Array(9).fill(-1))
        cells.forEach(cell =>
            this.grid[cell.coords.row][cell.coords.column] = cell.value 
        )
    }

    public static createCellArray(...cellInputs: [number, number, number][]): Cell[] {
        return cellInputs.map(([val, row, col]) => new Cell(val, row, col))
    }
    
    public static cellInputsValid(cells: Cell[]): boolean {
        return cells.every(cell => {
            let sameValues: Cell[] = cells.filter(c => c.value===cell.value)
            return sameValues.every( cll => {
                let sameRow: Cell[] = sameValues.filter(c => c.coords.row===cll.coords.row)
                let sameColumn: Cell[] = sameValues.filter(c => c.coords.column===cll.coords.column)
                return sameRow.length===1 && sameColumn.length===1
            })
        })
    }
    
    private rowsValid(): boolean {
        return this.grid.every(row => {
            for(let n=1; n<=9; n++) if (!row.includes(n)) return false
            return true
        })
    }
    
    private columnsValid(): boolean {
        
        for(let col=0; col<9; col++) {
            for(let n=1; n<=9; n++) {
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

function main(): void {
    let arr: Cell[] = Grid.createCellArray([2,1,3],[2,4,5], [2,2,3])
    console.log(Grid.cellInputsValid(arr))
}

main()
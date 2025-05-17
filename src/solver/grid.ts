import { Cell, Coords } from "./cell.ts"

export class Grid {
    private grid: number[][]
    
    constructor(cells: Cell[]) {
        if (!Grid.cellsValid(cells)) throw new Error("Cell inputs violate sudoku rules")
        this.grid = Array.from({length: 9}, () => Array(9).fill(-1))
        cells.forEach(cell =>
            this.grid[cell.coords.row][cell.coords.column] = cell.value 
        )
    }

    public static createCellArray(...cellInputs: [number, number, number][]): Cell[] {
        return cellInputs.map(([val, row, col]) => new Cell(val, row, col))
    }

    public static cellsValid(cells: Cell[]): boolean {
        let uniqueValueMap: Map<number, number[][]> = new Map()

        cells.forEach(cell => {
            if (!uniqueValueMap.has(cell.value)) uniqueValueMap.set(cell.value, [[],[],[]])
            let coordsArray: number[][] = uniqueValueMap.get(cell.value)!
            coordsArray[0].push(cell.coords.row)
            coordsArray[1].push(cell.coords.column)
            coordsArray[2].push(Coords.getBox(cell.coords))
        })
        
        for (const entry of uniqueValueMap.entries()) { 
            if (entry[1][0].length !== (new Set(entry[1][0])).size
            || entry[1][1].length !== (new Set(entry[1][1])).size
            || entry[1][2].length !== (new Set(entry[1][2]).size))
                return false
        }
        return true
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

    private boxesValid(): boolean {
        let boxMap: Map<number, number[]> = new Map()
        let box: number
        
        this.grid.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
                box = Coords.getBox(rowIndex, columnIndex)
                if (!boxMap.has(box)) boxMap.set(box, [])
                boxMap.get(box)!.push(value)
            })
        })

        for (const entry of boxMap.entries())
            if (entry[1].length !== (new Set(entry[1])).size) return false
        
        return true
    }

    
    public isValid(): boolean { 
        return this.columnsValid() && this.rowsValid() && this.boxesValid() 
    }
    
    public printGrid(): void {
        this.grid.forEach(row => console.log(row))
    }
}

function main(): void {
    let arr: Cell[] = Grid.createCellArray([2,1,3],[2,4,5], [3,2,3], [3,2,5])
    console.log(Grid.cellsValid(arr))
}

main()
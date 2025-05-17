import { Cell, Coords } from "./cell.ts"

export class Grid {
    private grid: number[][]
    readonly SIZE: number = 9
    readonly EMPTY_VALUE: number = -1
    
    constructor(cells: Cell[]) {
        if (!Grid.cellsValid(cells)) throw new Error("Cell inputs violate sudoku rules")
        this.grid = Array.from({length: this.SIZE}, () => Array(this.SIZE).fill(this.EMPTY_VALUE))
        cells.forEach(cell =>
            this.grid[cell.coords.row][cell.coords.column] = cell.value 
        )
    }

    public static createCellArray(...cellInputs: [number, number, number][]): Cell[] {
        return cellInputs.map(([val, row, col]) => new Cell(val, row, col))
    }

    public static cellsValid(cells: Cell[]): boolean {
        const uniqueValueMap: Map<number, number[][]> = new Map()
        let coordsArray: number[][]

        cells.forEach(cell => {
            if (!uniqueValueMap.has(cell.value)) uniqueValueMap.set(cell.value, [[],[],[]])
            coordsArray = uniqueValueMap.get(cell.value)!
            coordsArray[0].push(cell.coords.row)
            coordsArray[1].push(cell.coords.column)
            coordsArray[2].push(Coords.getBox(cell.coords))
        })
        
        for (const [_, otherValues] of uniqueValueMap.entries()) { 
            if (otherValues[0].length !== (new Set(otherValues[0])).size
            || otherValues[1].length !== (new Set(otherValues[1])).size
            || otherValues[2].length !== (new Set(otherValues[2])).size)
                return false
        }
        return true
    }
    
    private rowsValid(): boolean {
        return this.grid.every(row => {
            for(let n=1; n<=this.SIZE; n++) if (!row.includes(n)) return false
            return true
        })
    }
    
    private columnsValid(): boolean {
        for(let col=0; col<this.SIZE; col++) {
            for(let n=1; n<=this.SIZE; n++) {
                if (!this.grid.some(row => row[col] === n )) return false
            }
        }
        return true
    }

    private boxesValid(): boolean {
        const boxMap: Map<number, number[]> = new Map()
        let box: number
        
        this.grid.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
                box = Coords.getBox(rowIndex, columnIndex)
                if (!boxMap.has(box)) boxMap.set(box, [])
                boxMap.get(box)!.push(value)
            })
        })

        for (const [_, values] of boxMap.entries())
            if ((new Set(values)).size !== this.SIZE) return false
        
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
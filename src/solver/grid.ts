import { Cell, Coords } from "./cell.ts"

interface ValueLocations {
    rows: number[];
    columns: number[];
    boxes: number[];
}

export class Grid {
    private grid: number[][]
    readonly SIZE: number = 9
    readonly EMPTY_VALUE: number = 0
    
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
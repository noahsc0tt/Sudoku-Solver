import {Grid} from "./grid.ts"
import {Cell, Coords} from "./cell.ts"

interface Constraints {
    rowConstraints: Map<Number, Number[]>
    columnConstraints: Map<Number, Number[]>
    boxConstraints: Map<Number, Number[]>
    
}

export default class Brute_Forcer {

    static readonly rowPermMap: Map<number, number[]> = new Map()
    private cellsSoFar: Cell[]
    private grid: Grid

    static {
        Brute_Forcer.getPermutations(Grid.digits).forEach(
        (rowPerm, index) => this.rowPermMap.set(index, rowPerm))
    }

    constructor(grid: Grid) {
        this.grid = grid
        this.cellsSoFar = grid.givenCells
    }

    private static getConstraints(grid: Grid): Constraints {
        const constraints: Constraints = { rowConstraints: new Map, columnConstraints: new Map, boxConstraints: new Map }
        for (let i=0; i<grid.DIMENSION; i++) {
            constraints.rowConstraints.set(i, [])
            constraints.columnConstraints.set(i, [])
            constraints.boxConstraints.set(i, [])
        }

        grid.givenCells.forEach(cell => {
            constraints.rowConstraints.get(cell.coords.row)!.push(cell.value)
            constraints.columnConstraints.get(cell.coords.column)!.push(cell.value)
            constraints.boxConstraints.get(Coords.getBox(cell.coords))!.push(cell.value)
        })
        return constraints
    }



    private getPossibilities(grid: Grid) {
        const rowPossibilities: Map<number, number[]> = new Map()

        for (let i=0; i<grid.DIMENSION; i++) {
            const possibilities: number[] = []
            Brute_Forcer.rowPermMap.forEach((rowPerm, key) => {
                if (grid.rowConsistentWithGivenCells(rowPerm, i))
                        possibilities.push(key)
            })
            rowPossibilities.set(i, possibilities)
        }
        return rowPossibilities
    }

    private static getPermutations<T>(digits: T[]): T[][] {
        if (digits.length <= 1) return [digits]
        const permutations: T[][] = []

        for (let i = 0; i < digits.length; i++) {
            let digitsCopy = [...digits]
            let first = digitsCopy.splice(i,1)[0]
            for (const permutation of this.getPermutations(digitsCopy)) {
                permutations.push([first, ...permutation])
            }
        }
        return permutations;
    }

    
}
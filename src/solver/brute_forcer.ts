import {Grid} from "./grid.ts"
import {Cell, Coords} from "./cell.ts"

interface Constraints {
    rowConstraints: Map<Number, Number[]>
    columnConstraints: Map<Number, Number[]>
    boxConstraints: Map<Number, Number[]>
    
}

export default class Brute_Forcer {

    static readonly rowPermMap: Map<number, number[]> = new Map()

    static {
        Brute_Forcer.getPermutations(Grid.digits).forEach(
        (rowPerm, index) => this.rowPermMap.set(index, rowPerm))
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

    private static getPossibilities(grid: Grid) {
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

    public static solve(grid: Grid): Grid {
        let solutionCells: Cell[] = []
        this.__solve(grid, solutionCells, 0, Brute_Forcer.getPossibilities(grid))
        return new Grid(solutionCells)
    }
    
    private static __solve(grid: Grid, cellsSoFar: Cell[], rowIndex: number, possibilities: Map<number, number[]>): boolean {
        if (rowIndex>=grid.DIMENSION) return true

        for (const permIndex of possibilities.get(rowIndex) || []) {
            let perm: number[] = Brute_Forcer.rowPermMap.get(permIndex)!
            let permCells: Cell[] = Grid.createRowCellArray(perm, rowIndex)
            if (Grid.cellsValid(cellsSoFar.concat(permCells))){
                permCells.forEach(cell => {cellsSoFar.push(cell)})
                if (this.__solve(grid, cellsSoFar, rowIndex+1, possibilities)) return true
                cellsSoFar.splice(-9, grid.DIMENSION)
            }
            
        }
        return false
    }
}

function main() {
    const givenCells = Grid.createCellArray(
        [7,0,1], [2,0,4], [4,0,7], [6,0,8], [6,1,1], [8,1,6], [9,1,7],
        [2,2,0], [8,2,3], [7,2,6], [1,2,7], [5,2,8],
        [8,3,1], [4,3,2], [9,3,4], [7,3,5],
        [7,4,0], [1,4,1], [5,4,7], [9,4,8],
        [1,5,3], [3,5,4], [4,5,6], [8,5,7],
        [6,6,0], [9,6,1], [7,6,2], [2,6,5], [8,6,8],
        [5,7,1], [8,7,2], [2,7,6], [6,7,7],
        [4,8,0], [3,8,1], [8,8,4], [7,8,7]
    )

    const grid = new Grid(givenCells)

    Brute_Forcer.solve(grid).printGrid()
}
main()
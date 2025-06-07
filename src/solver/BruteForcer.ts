import { Grid } from "./Grid.ts"
import Cell from "./Cell.ts"
import GridUtils from "./GridUtils.ts"
import SudokuError from "./SudokuError.ts"

export default class BruteForcer {
    static readonly rowPermMap: Map<number, number[]> = new Map()
    static readonly DIMENSION = 9

    static {
        BruteForcer.getPermutations(Grid.digits).forEach((rowPerm, index) =>
            this.rowPermMap.set(index, rowPerm)
        )
    }

    private static getPermutations<T>(digits: T[]): T[][] {
        if (digits.length <= 1) return [digits]
        const permutations: T[][] = []

        for (let i = 0; i < digits.length; i++) {
            let digitsCopy = [...digits]
            let first = digitsCopy.splice(i, 1)[0]
            for (const permutation of this.getPermutations(digitsCopy)) {
                permutations.push([first, ...permutation])
            }
        }
        return permutations
    }

    private static getPossibilities(grid: Grid) {
        const rowPossibilities: Map<number, number[]> = new Map()

        for (let i = 0; i < Grid.DIMENSION; i++) {
            const possibilities: number[] = []
            BruteForcer.rowPermMap.forEach((rowPerm, key) => {
                if (grid.rowConsistentWithGivenCells(rowPerm, i))
                    possibilities.push(key)
            })
            rowPossibilities.set(i, possibilities)
        }
        return rowPossibilities
    }

    public static solve(cells: Cell[]): number[][] {
        const grid: Grid = new Grid(cells)
        let solutionCells: Cell[] = []
        if (!this.__solve(solutionCells, 0, BruteForcer.getPossibilities(grid)))
            throw new SudokuError("Grid cannot be solved")
        return new Grid(solutionCells).grid
    }

    private static __solve(
        cellsSoFar: Cell[],
        rowIndex: number,
        possibilities: Map<number, number[]>
    ): boolean {
        if (rowIndex >= Grid.DIMENSION) return true

        for (const permIndex of possibilities.get(rowIndex) || []) {
            let perm: number[] = BruteForcer.rowPermMap.get(permIndex)!
            let permCells: Cell[] = GridUtils.createRowCellArray(perm, rowIndex)
            if (GridUtils.cellsValid(cellsSoFar.concat(permCells))) {
                permCells.forEach((cell) => {
                    cellsSoFar.push(cell)
                })
                if (this.__solve(cellsSoFar, rowIndex + 1, possibilities))
                    return true
                cellsSoFar.splice(-1 * Grid.DIMENSION, Grid.DIMENSION)
            }
        }
        return false
    }
}

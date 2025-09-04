import Cell from "./Cell"
import GridUtils from "./GridUtils"
import SudokuError from "./SudokuError"

export default class Solver {
    static readonly rowPermMap: Map<number, number[]> = new Map()
    static readonly DIMENSION = 9

    static {
        Solver.getPermutations(GridUtils.digits).forEach((rowPerm, index) =>
            this.rowPermMap.set(index, rowPerm)
        )
    }

    private static getPermutations<T>(digits: T[]): T[][] {
        if (digits.length <= 1) return [digits]
        const permutations: T[][] = []

        for (let i = 0; i < digits.length; i++) {
            const digitsCopy = [...digits]
            const first = digitsCopy.splice(i, 1)[0]
            for (const permutation of this.getPermutations(digitsCopy)) {
                permutations.push([first, ...permutation])
            }
        }
        return permutations
    }

    private static getPossibilities(givenCells: Cell[]): Map<number, number[]> {
        const rowPossibilities: Map<number, number[]> = new Map()

        for (let i = 0; i < GridUtils.DIMENSION; i++) {
            const possibilities: number[] = []
            Solver.rowPermMap.forEach((rowPerm, key) => {
                if (GridUtils.rowConsistentWithCells(rowPerm, i, givenCells))
                    possibilities.push(key)
            })
            rowPossibilities.set(i, possibilities)
        }
        return rowPossibilities
    }

    public static solve(givenCells: Cell[]): number[][] {
        const solutionCells: Cell[] = []
        if (!this.__solve(solutionCells, 0, Solver.getPossibilities(givenCells)))
            throw new SudokuError("Grid cannot be solved")
        return GridUtils.createGrid(solutionCells)
    }

    private static __solve(
        cellsSoFar: Cell[],
        rowIndex: number,
        possibilities: Map<number, number[]>
    ): boolean {
        if (rowIndex >= GridUtils.DIMENSION) return true

        for (const permIndex of possibilities.get(rowIndex) || []) {
            const perm: number[] = Solver.rowPermMap.get(permIndex)!
            const permCells: Cell[] = GridUtils.createRowCellArray(perm, rowIndex)
            if (GridUtils.cellsValid(cellsSoFar.concat(permCells))) {
                permCells.forEach((cell) => {
                    cellsSoFar.push(cell)
                })
                if (this.__solve(cellsSoFar, rowIndex + 1, possibilities))
                    return true
                cellsSoFar.splice(-1 * GridUtils.DIMENSION, GridUtils.DIMENSION)
            }
        }
        return false
    }
}

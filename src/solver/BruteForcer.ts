import { Grid } from "./Grid.ts"
import { Cell } from "./Cell.ts"
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

    public static solve(cells: Cell[]): number[][]
    public static solve(grid: Grid): number[][]
    public static solve(gridOrCells: Grid | Cell[]): number[][] {
        const grid: Grid =
            gridOrCells instanceof Grid ? gridOrCells : new Grid(gridOrCells)
        grid.printGrid()
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
            let permCells: Cell[] = Grid.createRowCellArray(perm, rowIndex)
            if (Grid.cellsValid(cellsSoFar.concat(permCells))) {
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

function testSudokuSolver() {
    console.log("===== TESTING SUDOKU SOLVER =====")

    // Test 1: Easy Sudoku
    console.log("\nTEST 1: EASY PUZZLE")
    const easyCells = [
        new Cell(5, 0, 0),
        new Cell(3, 0, 1),
        new Cell(7, 0, 4),
        new Cell(6, 1, 0),
        new Cell(1, 1, 3),
        new Cell(9, 1, 4),
        new Cell(5, 1, 5),
        new Cell(9, 2, 1),
        new Cell(8, 2, 2),
        new Cell(6, 2, 7),
        new Cell(8, 3, 0),
        new Cell(6, 3, 4),
        new Cell(3, 3, 8),
        new Cell(4, 4, 0),
        new Cell(8, 4, 3),
        new Cell(3, 4, 5),
        new Cell(1, 4, 8),
        new Cell(7, 5, 0),
        new Cell(2, 5, 4),
        new Cell(6, 5, 8),
        new Cell(6, 6, 1),
        new Cell(2, 6, 6),
        new Cell(8, 6, 7),
        new Cell(4, 7, 3),
        new Cell(1, 7, 4),
        new Cell(9, 7, 5),
        new Cell(5, 7, 8),
        new Cell(8, 8, 4),
        new Cell(7, 8, 7),
        new Cell(9, 8, 8),
    ]

    // Test 2: Medium Sudoku
    console.log("\nTEST 2: MEDIUM PUZZLE")
    const mediumCells = [
        new Cell(2, 0, 3),
        new Cell(6, 0, 4),
        new Cell(7, 0, 6),
        new Cell(1, 0, 8),
        new Cell(6, 1, 0),
        new Cell(8, 1, 1),
        new Cell(7, 1, 4),
        new Cell(9, 1, 7),
        new Cell(1, 2, 0),
        new Cell(9, 2, 1),
        new Cell(4, 2, 5),
        new Cell(5, 2, 6),
        new Cell(8, 3, 0),
        new Cell(2, 3, 1),
        new Cell(1, 3, 3),
        new Cell(4, 3, 7),
        new Cell(4, 4, 2),
        new Cell(6, 4, 3),
        new Cell(2, 4, 5),
        new Cell(9, 4, 6),
        new Cell(5, 5, 1),
        new Cell(3, 5, 5),
        new Cell(2, 5, 7),
        new Cell(8, 5, 8),
        new Cell(9, 6, 2),
        new Cell(3, 6, 3),
        new Cell(7, 6, 7),
        new Cell(4, 6, 8),
        new Cell(4, 7, 1),
        new Cell(5, 7, 4),
        new Cell(3, 7, 7),
        new Cell(6, 7, 8),
        new Cell(7, 8, 0),
        new Cell(3, 8, 2),
        new Cell(1, 8, 4),
        new Cell(8, 8, 5),
    ]

    // Test 3: Hard Sudoku
    console.log("\nTEST 3: HARD PUZZLE")
    const hardCells = [
        new Cell(2, 0, 1),
        new Cell(6, 0, 3),
        new Cell(8, 0, 5),
        new Cell(5, 1, 0),
        new Cell(8, 1, 1),
        new Cell(9, 1, 5),
        new Cell(7, 1, 6),
        new Cell(4, 2, 4),
        new Cell(3, 3, 0),
        new Cell(7, 3, 1),
        new Cell(5, 3, 6),
        new Cell(6, 4, 0),
        new Cell(4, 4, 8),
        new Cell(8, 5, 2),
        new Cell(1, 5, 7),
        new Cell(3, 5, 8),
        new Cell(2, 6, 4),
        new Cell(9, 7, 2),
        new Cell(8, 7, 3),
        new Cell(3, 7, 7),
        new Cell(6, 7, 8),
        new Cell(3, 8, 3),
        new Cell(6, 8, 5),
        new Cell(9, 8, 7),
    ]

    // Run tests
    testCells("Easy Puzzle", easyCells)
    testCells("Medium Puzzle", mediumCells)
    testCells("Hard Puzzle", hardCells)

    function testCells(name: string, cells: Cell[]) {
        console.log(`\nTesting ${name}`)
        console.log("Input puzzle:")

        // Print the input grid
        const inputGrid = new Grid(cells)
        inputGrid.printGrid()

        console.log("\nSolving...")
        const startTime = performance.now()

        try {
            const solution = BruteForcer.solve(cells)
            const endTime = performance.now()

            console.log(`\nSolved in ${(endTime - startTime).toFixed(2)}ms!`)
            console.log("\nSolution:")

            // Create a grid from the solution
            const solutionGrid = new Grid([]) // Empty grid
            solutionGrid.setGrid(solution) // Set with solution values
            solutionGrid.printGrid()

            // Verify the solution
            console.log(
                `\nSolution is ${solutionGrid.isValid() ? "VALID" : "INVALID"}`
            )
        } catch (error) {
            console.error(
                `Failed to solve: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            )
        }

        console.log("-----------------------------------")
    }
}

testSudokuSolver()

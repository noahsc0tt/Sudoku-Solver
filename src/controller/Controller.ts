import Cell from "../solver/Cell"
import Coords from "../solver/Coords"
import Solver from "../solver/Solver"
import GridUtils from "../solver/GridUtils"
import SudokuError from "../solver/SudokuError"

// Factory MVC controller class, implementing the singleton pattern
export class ControllerFactory {
    static instance: Controller | null = null

    public static getInstance(): Controller {
        if (ControllerFactory.instance === null)
            ControllerFactory.instance = new Controller()
        return ControllerFactory.instance
    }
}

export class Controller {
    // cells are stored in a map with string representation of coords as key (to avoid Coords object reference comparisons)
    private valueMap: Map<string, number> = new Map()

    public setCell(coords: Coords, value: number) {
        if (isNaN(value)) throw new TypeError("Please enter a number")
        else if (value < 1 || value > 9)
            throw new RangeError("Cell value out of range")
        else this.valueMap.set(coords.toString(), value)
    }

    public removeCell(coords: Coords): boolean {
        return this.valueMap.delete(coords.toString())
    }

    public solve(): number[][] {
        const cellArray: Cell[] = []
        this.valueMap.forEach((value, coords) => {
            cellArray.push(new Cell(value, Coords.fromString(coords)))
        })
        if (!GridUtils.cellsValid(cellArray))
            throw new SudokuError("Cells violate sudoku rules")
        return Solver.solve(cellArray)
    }

    public clear(): void {
        this.valueMap.clear()
    }
}

export default ControllerFactory.getInstance()

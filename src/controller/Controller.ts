import Cell from "../solver/Cell"
import Coords from "../solver/Coords"
import BruteForcer from "../solver/BruteForcer"

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
    private valueMap: Map<string, number> = new Map()

    public setCell(coords: Coords, value: number) {
        if (value < 1 || value > 9)
            throw new RangeError("Cell value out of range")
        this.valueMap.set(coords.toString(), value)
    }

    public removeCell(coords: Coords): boolean {
        return this.valueMap.delete(coords.toString())
    }

    public solve(): number[][] {
        const cellArray: Cell[] = []
        this.valueMap.forEach((value, coords) => {
            cellArray.push(new Cell(value, Coords.fromString(coords)))
        })
        return BruteForcer.solve(cellArray)
    }

    public printCells(): void {
        console.log("Cells:")
        this.valueMap.forEach((value, coords) =>
            console.log(`(${coords}): ${value}`)
        )
    }

    public clear(): void {
        this.valueMap.clear()
    }
}

export default ControllerFactory.getInstance()

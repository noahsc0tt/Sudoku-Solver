import { Cell, Coords } from "../solver/Cell"
import BruteForcer from "../solver/BruteForcer"

export class GridModelFactory {
    static instance: GridModel | null = null

    public static getInstance(): GridModel {
        if (GridModelFactory.instance === null)
            GridModelFactory.instance = new GridModel()
        return GridModelFactory.instance
    }
}

export class GridModel {
    private valueMap: Map<Coords, number> = new Map()

    public setCell(coords: Coords, value: number) {
        if (value < 1 || value > 9)
            throw new RangeError("Cell value out of range")
        this.valueMap.set(coords, value)
    }

    public removeCell(coords: Coords): boolean {
        return this.valueMap.delete(coords)
    }

    public solve(): number[][] {
        const cellArray: Cell[] = []
        this.valueMap.forEach((value, coords) => {
            cellArray.push(new Cell(value, coords))
        })
        return BruteForcer.solve(cellArray)
    }

    public printCells(): void {
        this.valueMap.forEach((value, coords) =>
            console.log(`(${coords.row},${coords.column}): ${value}`)
        )
    }

    public clear(): void {
        this.valueMap.clear()
    }
}

export default GridModelFactory.getInstance()

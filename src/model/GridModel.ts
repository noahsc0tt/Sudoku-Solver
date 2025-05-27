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

    public addCell(coords: Coords, value: number) {
        this.valueMap.set(coords, value)
    }

    public solve(): number[][] {
        const cellArray: Cell[] = []
        this.valueMap.forEach((value, coords) => {cellArray.push(new Cell(value, coords))})
        return BruteForcer.solve(cellArray)
    }

    public clear(): void {
        this.valueMap.clear()
    }
}

export default GridModelFactory.getInstance()
import type { Grid } from "../solver/Grid"
import { Cell, Coords } from "../solver/Cell"
import BruteForcer from "../solver/BruteForcer"

export default class GridModel {
    private valueMap: Map<Coords, number>

    constructor(){
        this.valueMap = new Map()
    }

    public addCell(coords: Coords, value: number) {
        this.valueMap.set(coords, value)
    }

    public solve(): number[][] {
        const cellArray: Cell[] = []
        this.valueMap.forEach((value, coords) => {cellArray.push(new Cell(value, coords))})
        return BruteForcer.solve(cellArray)
    }
}
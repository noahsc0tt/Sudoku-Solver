import Cell from "./Cell"
import Coords from "./Coords"

export interface ValueLocations {
    rows: number[]
    columns: number[]
    boxes: number[]
}

export default class GridUtils {

    public static cellsValid(cells: Cell[]): boolean {
        const valueLocationsMap: Map<number, ValueLocations> = new Map()
        let sameValueLocations: ValueLocations

        cells.forEach(cell => {
            if (!valueLocationsMap.has(cell.value)) valueLocationsMap.set(cell.value, { rows: [], columns: [], boxes: []})
            sameValueLocations = valueLocationsMap.get(cell.value)!
            sameValueLocations.rows.push(cell.coords.row)
            sameValueLocations.columns.push(cell.coords.column)
            sameValueLocations.boxes.push(Coords.getBox(cell.coords))
        })
        
        for (const [_, locations] of valueLocationsMap.entries()) { 
            if (locations.rows.length !== (new Set(locations.rows)).size
            || locations.columns.length !== (new Set(locations.columns)).size
            || locations.boxes.length !== (new Set(locations.boxes)).size)
                return false
        }
        return true
    }
}
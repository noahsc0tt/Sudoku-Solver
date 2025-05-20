import Grid from "./grid.ts"
import {Cell, Coords} from "./cell.ts"

interface Constraints {
    rowConstraints: Map<Number, Number[]>
    columnConstraints: Map<Number, Number[]>
    boxConstraints: Map<Number, Number[]>
    
}

export default class Brute_Forcer {

    public static getConstraints(grid: Grid): Constraints {
        const constraints: Constraints = { rowConstraints: new Map, columnConstraints: new Map, boxConstraints: new Map }
        grid.givenCells.forEach(cell => {
            if (!constraints.rowConstraints.has(cell.coords.row)) 
                constraints.rowConstraints.set(cell.coords.row, [])
            if (!constraints.columnConstraints.has(cell.coords.column)) 
                constraints.columnConstraints.set(cell.coords.column, [])
            if (!constraints.boxConstraints.has(Coords.getBox(cell.coords))) 
                constraints.boxConstraints.set(Coords.getBox(cell.coords), [])

            constraints.rowConstraints.get(cell.coords.row)!.push(cell.value)
            constraints.columnConstraints.get(cell.coords.column)!.push(cell.value)
            constraints.boxConstraints.get(Coords.getBox(cell.coords))!.push(cell.value)
        })
        return constraints
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
}
import Controller from "../controller/Controller"
import { useState } from "react"
import SudokuError from "../solver/SudokuError"

const getEmptyInputGrid = () => {
    return [
        ...Array(9)
            .fill(null)
            .map(() => Array(9).fill("")),
    ]
}

const getEmptyOutputGrid = () => {
    return [
        ...Array(9)
            .fill(null)
            .map(() => Array(9).fill(0)),
    ]
}

export const updateInputGrid = (
    inputGrid: string[][],
    setInputGrid: Function,
    value: string,
    row: number,
    column: number
) => {
    // making a new copy of the grid and applying the change (so state is updated)
    const newGrid = [...inputGrid]
    newGrid[row][column] = value
    setInputGrid(newGrid)
}

export const solve = (setOutputGrid: Function) => {
    try {
        setOutputGrid(Controller.solve())
    } catch (error) {
        alert((error as SudokuError).message)
    }
}

export const clear = (setInputGrid: Function, setOutputGrid: Function) => {
    Controller.clear()
    setInputGrid(getEmptyInputGrid())
    setOutputGrid(getEmptyOutputGrid())
}

export const useGridHook = (): [
    [string[][], Function],
    [number[][], Function]
] => {
    return [
        useState<string[][]>(getEmptyInputGrid()),
        useState<number[][]>(getEmptyOutputGrid()),
    ]
}

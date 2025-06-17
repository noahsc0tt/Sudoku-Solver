import "../stylesheets/styles.css"
import Coords from "../solver/Coords"
import Controller from "../controller/Controller"
import SudokuError from "../solver/SudokuError"
import { updateInputGrid } from "./GridUtils"

type InputCellProps = {
    value: string
    row: number
    col: number
    handler: (value: string, row: number, col: number) => void
}

type GridProps = {
    grid: string[][]
    setter: Function
}

const handleInput = (inputGrid: string[][], setInputGrid, value: string, row: number, column: number) => {
    const intValue: number = parseInt(value)
    const coords = new Coords(row, column)

    if (value === "") {
        Controller.removeCell(coords)
        updateInputGrid(inputGrid, setInputGrid, value, row, column)
    }
    else if (isNaN(intValue)) {
        alert("Please enter a number")
    }
    else {
        try {
            Controller.setCell(coords, intValue)
            updateInputGrid(inputGrid, setInputGrid, value, row, column)
        } catch (error) {
            alert((error as SudokuError).message)
        }
    }
}

function InputCell({ value, row, col, handler }: InputCellProps) {
    return (
        <input
            className="sudoku-cell"
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handler(e.target.value, row, col)}
        />
    )
}

export default function InputGrid({ grid, setter }: GridProps) {
    const onCellChange = (value: string, row: number, col: number) => {
        handleInput(grid, setter, value, row, col)
    }

    return (
        <div className="grid-container">
            {grid.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="grid-row">
                    {row.map((cellValue, colIndex) => (
                        <InputCell
                            key={`cell-${rowIndex}-${colIndex}`}
                            value={cellValue}
                            row={rowIndex}
                            col={colIndex}
                            handler={onCellChange}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

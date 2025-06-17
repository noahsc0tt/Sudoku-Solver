import "../stylesheets/styles.css"
import Coords from "../solver/Coords"
import Controller from "../controller/Controller"
import SudokuError from "../solver/SudokuError"
import { updateInputGrid } from "./GridUtils"
import { InputCell, OutputCell } from "./Cell"

type GridProps = {
    grid: string[][] | number[][]
    setter: Function
}

const handleInput = (
    inputGrid: string[][],
    setInputGrid,
    value: string,
    row: number,
    column: number
) => {
    const coords = new Coords(row, column)

    if (value === "") {
        Controller.removeCell(coords)
        updateInputGrid(inputGrid, setInputGrid, value, row, column)
    } else {
        try {
            Controller.setCell(coords, parseInt(value))
            updateInputGrid(inputGrid, setInputGrid, value, row, column)
        } catch (error) {
            alert((error as Error).message)
        }
    }
}

export default function Grid({ grid, setter }: GridProps) {
    return (
        <div className="grid-container">
            {grid.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="grid-row">
                    {row.map((cellValue, colIndex) => {
                        if (typeof grid[0]?.[0] === "string") {
                            return (
                                <InputCell
                                    key={`cell-${rowIndex}-${colIndex}`}
                                    value={cellValue as string}
                                    row={rowIndex}
                                    col={colIndex}
                                    onCellChange={(value) =>
                                        handleInput(
                                            grid as string[][],
                                            setter,
                                            value,
                                            rowIndex,
                                            colIndex
                                        )
                                    }
                                />
                            )
                        } else {
                            return (
                                <OutputCell
                                    key={`cell-${rowIndex}-${colIndex}`}
                                    value={cellValue}
                                />
                            )
                        }
                    })}
                </div>
            ))}
        </div>
    )
}

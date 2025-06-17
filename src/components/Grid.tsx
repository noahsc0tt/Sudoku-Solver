import "../stylesheets/styles.css"
import Coords from "../solver/Coords"
import Controller from "../controller/Controller"
import { updateInputGrid } from "./ViewUtils"
import { InputCell, OutputCell } from "./Cell"

type GridProps = {
    grid: string[][] | number[][]
    setter?: Function
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

const getCellComponent = (
    gridProps: GridProps,
    value: string | number,
    row: number,
    col: number
) => {
    if (typeof gridProps.grid[0]?.[0] === "string")
        // if grid is an input grid
        return (
            <InputCell
                key={`cell-${row}-${col}`}
                value={value as string}
                row={row}
                col={col}
                onCellChange={(value) =>
                    handleInput(
                        gridProps.grid as string[][],
                        gridProps.setter!,
                        value,
                        row,
                        col
                    )
                }
            />
        )
    // if grid is an output grid
    return <OutputCell key={`cell-${row}-${col}`} value={value as number} />
}

export default function Grid(gridProps: GridProps) {
    return (
        <div className="grid-container">
            {gridProps.grid.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="grid-row">
                    {row.map((value, colIndex) =>
                        getCellComponent(gridProps, value, rowIndex, colIndex)
                    )}
                </div>
            ))}
        </div>
    )
}

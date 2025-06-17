import "../stylesheets/styles.css"
import Coords from "../solver/Coords"
import Controller from "../controller/Controller"
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

const getCellComponent = (
    grid: string[][] | number[][],
    setter: Function,
    value: string | number,
    row: number,
    col: number
) => {
    if (typeof grid[0]?.[0] === "string") {
        return (
            <InputCell
                key={`cell-${row}-${col}`}
                value={value as string}
                row={row}
                col={col}
                onCellChange={(value) =>
                    handleInput(grid as string[][], setter, value, row, col)
                }
            />
        )
    } else {
        return <OutputCell key={`cell-${row}-${col}`} value={value as number} />
    }
}

export default function Grid({ grid, setter }: GridProps) {
    return (
        <div className="grid-container">
            {grid.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="grid-row">
                    {row.map((value, colIndex) =>
                        getCellComponent(
                            grid,
                            setter,
                            value,
                            rowIndex,
                            colIndex
                        )
                    )}
                </div>
            ))}
        </div>
    )
}

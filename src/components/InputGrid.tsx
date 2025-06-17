import "../stylesheets/styles.css"
import { handleInput } from "./GridUtils"

type InputCellProps = {
    val: string
    row: number
    col: number
    handler: (value: string, row: number, col: number) => void
}

type InputGridProps = {
    grid: string[][]
    setter: Function
}

function InputCell({ val, row, col, handler }: InputCellProps) {
    return (
        <input
            key={`solution-${row}-${col}`}
            className="sudoku-cell"
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => handler(e.target.value, row, col)}
        />
    )
}

export default function InputGrid({ grid, setter }: InputGridProps) {
    const onCellChange = (value: string, row: number, col: number) => {
        handleInput(grid, setter, value, row, col)
    }

    return (
        <div className="grid-container">
            {grid.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="grid-row">
                    {row.map((cellValue, colIndex) => (
                        <InputCell
                            val={cellValue}
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

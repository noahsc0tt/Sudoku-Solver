import "../stylesheets/styles.css"

type OutputGridProps = {
    grid: number[][]
    setter: Function
}
type OutputCellProps = {
    key: string
    val: number
}

function OutputCell({key, val}: OutputCellProps) {
    return (
        <input
            key={key}
            className="sudoku-cell"
            type="text"
            maxLength={1}
            value={val === 0 ? "" : val.toString()}
            readOnly
        />
    )
}

export default function OutputGrid(props: OutputGridProps) {
    return (
        <div className="grid-container">
            {props.grid.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="grid-row">
                    {row.map((cellValue, colIndex) => (
                        <OutputCell 
                            key={`cell-${rowIndex}-${colIndex}`} 
                            val={cellValue}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

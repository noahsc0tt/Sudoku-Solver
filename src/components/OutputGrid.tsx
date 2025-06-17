import "../stylesheets/styles.css"

function OutputCell({value}: {value: number}) {
    return (
        <input
            className="sudoku-cell"
            type="text"
            maxLength={1}
            value={value === 0 ? "" : value.toString()}
            readOnly
        />
    )
}

export default function OutputGrid({grid}: {grid:number[][]}) {
    return (
        <div className="grid-container">
            {grid.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="grid-row">
                    {row.map((cellValue, colIndex) => (
                        <OutputCell 
                            key={`cell-${rowIndex}-${colIndex}`} 
                            value={cellValue}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

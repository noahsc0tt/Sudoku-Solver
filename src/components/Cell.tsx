import "../stylesheets/styles.css"


type InputCellProps = {
    value: string
    row: number
    col: number
    onCellChange: (value: string, row: number, col: number) => void
}

export function InputCell({ value, row, col, onCellChange }: InputCellProps) {
    return (
        <input
            className="sudoku-cell"
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => onCellChange(e.target.value, row, col)}
        />
    )
}


export function OutputCell({value}: {value: number}) {
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

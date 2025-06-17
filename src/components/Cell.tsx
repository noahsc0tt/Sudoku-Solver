import "../stylesheets/styles.css"

const baseCellProps = {
    className: "sudoku-cell",
    type: "text",
    maxLength: 1
}

type InputCellProps = {
    value: string
    row: number
    col: number
    onCellChange: (value: string, row: number, col: number) => void
}

export function InputCell({ value, row, col, onCellChange }: InputCellProps) {
    return (
        <input
            {...baseCellProps}
            value={value}
            onChange={(e) => onCellChange(e.target.value, row, col)}
        />
    )
}

export function OutputCell({value}: {value: number}) {
    return (
        <input
            {...baseCellProps}
            value={value === 0 ? "" : value.toString()}
            readOnly
        />
    )
}

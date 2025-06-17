import "../stylesheets/styles.css"

const baseCell = {
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
            {...baseCell}
            value={value}
            onChange={(e) => onCellChange(e.target.value, row, col)}
        />
    )
}

export function OutputCell({value}: {value: number}) {
    return (
        <input
            {...baseCell}
            value={value === 0 ? "" : value.toString()}
            readOnly
        />
    )
}

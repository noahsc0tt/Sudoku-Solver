export default function InputGrid() {
    handleChange
    
    return <div className="grid grid-cols-9 gap-1">
    {
        let grid: number[][] = []
        grid.map((row, rowIndex) => (
        row.map((value, colIndex) => (
        <input
            key={`${rowIndex}-${colIndex}`}
            className="w-10 h-10 text-center border"
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e.target.value, rowIndex, colIndex)}
        />
        ))
    ))}
    </div>
}
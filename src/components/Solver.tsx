import Button from "./Button"
import { clear, solve, handleInput, useGridHook } from "./GridUtils"
import "../stylesheets/styles.css"
import InputGrid from "./InputGrid"


export default function Grid() {
    const [[inputGrid, setInputGrid], [outputGrid, setOutputGrid]] = useGridHook()

    return (
        <>
            <br />
            
            <InputGrid grid={inputGrid} setter={setInputGrid} />

            <br />
            <Button onClick={() => clear(setInputGrid, setOutputGrid)} label={"Clear"}/>
            <Button onClick={() => solve(setOutputGrid)} label={"Solve"}/>
            <br />
            <br />
            <h2>Solution:</h2>
            <div className="grid-container">
                {outputGrid.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="grid-row">
                        {row.map((cellValue, colIndex) => (
                            <input
                                key={`solution-${rowIndex}-${colIndex}`}
                                className="sudoku-cell"
                                type="text"
                                maxLength={1}
                                value={cellValue === 0 ? "" : cellValue.toString()}
                                readOnly
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

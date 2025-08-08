import Button from "./Button"
import { clear, solve, useGridHook } from "./ViewUtils"
import "../stylesheets/styles.css"
import Grid from "./Grid"
import { useState } from "react"

export default function Solver() {
    const [[inputGrid, setInputGrid], [outputGrid, setOutputGrid]] =
        useGridHook()
    const [isSolving, setIsSolving] = useState(false)

    const handleSolve = () => {
        setIsSolving(true)
        // Use setTimeout to allow a re-render before solve() is called
        setTimeout(() => {
            solve(setOutputGrid)
            setIsSolving(false)
        }, 0)
    }

    return (
        <div className="solver-container">
            <div className="input-section">
                <h2 className="section-title">Input</h2>
                <Grid grid={inputGrid} setter={setInputGrid} />
                <div className="controls">
                    <Button
                        onClick={() => clear(setInputGrid, setOutputGrid)}
                        label="Clear"
                    />
                    <Button onClick={handleSolve} label="Solve" />
                </div>
            </div>

            <div className="output-section">
                <h2 className="section-title">Solution</h2>
                <Grid grid={outputGrid} />
                {isSolving && <p>Solving...</p>}
            </div>
        </div>
    )
}

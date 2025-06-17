import Button from "./Button"
import { clear, solve, useGridHook } from "./ViewUtils"
import "../stylesheets/styles.css"
import Grid from "./Grid"

export default function Solver() {
    const [[inputGrid, setInputGrid], [outputGrid, setOutputGrid]] =
        useGridHook()

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
                    <Button
                        onClick={() => solve(setOutputGrid)}
                        label="Solve"
                    />
                </div>
            </div>

            <div className="output-section">
                <h2 className="section-title">Solution</h2>
                <Grid grid={outputGrid} />
            </div>
        </div>
    )
}

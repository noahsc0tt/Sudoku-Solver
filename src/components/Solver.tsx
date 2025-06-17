import Button from "./Button"
import { clear, solve, useGridHook } from "./GridUtils"
import "../stylesheets/styles.css"
import Grid from "./Grid"



export default function Solver() {
    const [[inputGrid, setInputGrid], [outputGrid, setOutputGrid]] = useGridHook()

    return (
        <>
            <br />
            <Grid grid={inputGrid} setter={setInputGrid} />
            <br />
            <Button onClick={() => clear(setInputGrid, setOutputGrid)} label={"Clear"}/>
            <Button onClick={() => solve(setOutputGrid)} label={"Solve"}/>
            <br />
            <br />
            <h2>Solution:</h2>
            <Grid grid={outputGrid} setter={setOutputGrid}/>
        </>
    )
}

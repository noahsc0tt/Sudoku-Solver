import Button from "./Button"
import { clear, solve, useGridHook } from "./GridUtils"
import "../stylesheets/styles.css"
import InputGrid from "./InputGrid"
import OutputGrid from "./OutputGrid"


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
            <OutputGrid grid={outputGrid} setter={setOutputGrid}/>
        </>
    )
}

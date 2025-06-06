import { useState } from "react"
import Button from "./Button"
import GridModel from "../model/GridModel"
import { Coords } from "../solver/Cell"
import "../stylesheets/styles.css"

export default function Grid() {
    const getEmptyGrid = () => {
        return [
            ...Array(9)
                .fill(null)
                .map(() => Array(9).fill("")),
        ]
    }

    const [inputGrid, setInputGrid] = useState<string[][]>(getEmptyGrid())
    const [outputGrid, setOutputGrid] = useState<number[][]>(getEmptyGrid())

    const updateInputGrid = (value: string, row: number, column: number) => {
        // making a new copy of the grid and applying the change (so state is updated)
        const newGrid = [...inputGrid]
        newGrid[row][column] = value
        setInputGrid(newGrid)
    }

    const handleInput = (value: string, row: number, column: number) => {
        const intValue: number = parseInt(value)
        const coords = new Coords(row, column)

        if (value === "") {
            GridModel.removeCell(coords)
            updateInputGrid(value, row, column)
        }
        else if (isNaN(intValue)) {
            alert("Please enter a number")
        }
        else {
            GridModel.setCell(coords, intValue)
            updateInputGrid(value, row, column)
        }
    }

    const solve = () => {
        try {
            setOutputGrid(GridModel.solve())
        } catch (error) {
            alert((error as Error).message)
        }
    }

    const clear = () => {
        GridModel.clear()
        setInputGrid(getEmptyGrid())
        setOutputGrid(getEmptyGrid())
    }

    return (
        <>
            <Button
                onClick={() => GridModel.printCells()}
                label="debug: print grid"
            />
            <br />
            <div className="grid-container">
                {inputGrid.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="grid-row">
                        {row.map((cellValue, colIndex) => (
                            <input
                                key={`solution-${rowIndex}-${colIndex}`}
                                className="sudoku-cell"
                                type="text"
                                maxLength={1}
                                value={cellValue}
                                onChange={(e) =>
                                    handleInput(
                                        e.target.value,
                                        rowIndex,
                                        colIndex
                                    )
                                }
                            />
                        ))}
                    </div>
                ))}
            </div>

            <br />
            <Button onClick={solve} label={"Solve"} />
            <Button onClick={clear} label={"Clear"} />
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
                                value={cellValue.toString()}
                                readOnly
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

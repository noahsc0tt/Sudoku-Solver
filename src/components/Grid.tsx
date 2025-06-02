import { useState } from 'react'
import Button from './Button'
import GridModel from '../model/GridModel'
import { Coords } from '../solver/Cell'
import '../stylesheets/styles.css'

export default function Grid() {

    const getEmptyGrid = () => { 
        return [...Array(9).fill(null).map(() => Array(9).fill(''))]
    }

    const [grid, setGrid] = useState<string[][]>(
        getEmptyGrid()
    )
    const [solution, setSolution] = useState<number[][] | null>(null);


    const handleInput = (value: string, row: number, column: number) => {
        const newGrid = [...grid];
        newGrid[row][column] = value;
        setGrid(newGrid);
        GridModel.setCell(new Coords(row, column), parseInt(value))
}

    const solve = () => {
        try { setSolution(GridModel.solve()) }
        catch (error) {alert((error as Error).message)}
    }

    const clear = () => {
        GridModel.clear()
        setGrid(getEmptyGrid())
    }

    return (<>
    <div className="grid-container">
      {grid.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="grid-row">
          {row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              className="sudoku-cell"
              type="text"
              maxLength={1}
              value={solution ? solution[rowIndex][colIndex].toString() : value}
              onChange={(e) => handleInput(e.target.value, rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
    <br/><br/>
    <Button onClick={solve} label={"Solve"}/>
    <br/>
    <Button onClick={clear} label={"Clear"}/>
    </>)
}
import {useState} from 'react'
import { Grid } from '../solver/Grid'
import GridComponent from '../components/Grid'

function Test() {
    const [count, setCount] = useState(0)

  return (
    <>
        <h1>Sudoku Solver</h1>
        <div>
            <GridComponent/>
        </div>
    </>
  )
}

export default Test
import {useState} from 'react'
import { Grid } from '../solver/Grid'
import InputGrid from '../components/InputGrid'

function Test() {
    const [count, setCount] = useState(0)

  return (
    <>
        <h1>Sudoku Solver</h1>
        <div>
            <InputGrid/>
        </div>
    </>
  )
}

export default Test
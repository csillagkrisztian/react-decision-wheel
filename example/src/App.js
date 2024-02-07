import React, { useState, useRef } from 'react'

import WheelComponent from './indexCopy'
import './index.css'

const App = () => {

  const wheelRef = useRef();
  const [segments, setSegments] = useState([
    'better luck next time',
    'won 70',
    'won 10',
    'better luck next time',
    'won 2',
    'won uber pass',
    'better luck next time',
    'won a voucher',
    'won 70',
    'won 10',
    'better luck next time',
    'won 2',
    'won uber pass',
    'better luck next time',
    'won a voucher'
  ])

  console.log(segments)

  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]
  const onFinished = (winner) => {
    //console.log(winner)
  }
  return (
    <React.Fragment>
      <WheelComponent
        ref={wheelRef}
        segments={segments}
        segColors={segColors}
        onFinished={(winner) => onFinished(winner)}
        primaryColor='black'
        contrastColor='white'
        buttonText='Spin'
        isOnlyOnce={false}
        size={290}
        upDuration={100}
        downDuration={1000}
      />
      <button onClick={()=>{
          wheelRef.current.spin(segments)
        }}>SPIN</button>
        <button onClick={()=>{
          setSegments(state=>{
          const newSegments = ([...state, 'addNew'])
          wheelRef.current.redraw(newSegments)
          return newSegments
          })
          
        }}>+</button>
        <button onClick={()=>{
          setSegments(state=>{
          const newSegments = ([...state.slice(0, state.length-1)])
          wheelRef.current.redraw(newSegments)
          return newSegments
          })
        }}>-</button>
    </React.Fragment>
  )
}

export default App

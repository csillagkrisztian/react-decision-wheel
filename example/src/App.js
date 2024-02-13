import React, { useState, useRef } from 'react'

import WheelComponent from './indexCopy'
import './index.css'

const App = () => {
  const wheelRef = useRef()
  const [segments, setSegments] = useState([
    {
      text: 'Blood Rage',
      image:
        'https://cf.geekdo-images.com/HkZSJfQnZ3EpS214xtuplg__original/img/Myy6IPDJDzLoPdXrPXVZcddBQoQ=/0x0/filters:format(jpeg)/pic2439223.jpg'
    },
    {
      text: 'Rising Sun',
      image:
        'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__original/img/pKJ1XyLN4hvHim5eRj2VJHijv1E=/0x0/filters:format(jpeg)/pic3880340.jpg'
    },
    {
      text: 'Ankh: Gods of Egypt',
      image:
        'https://cf.geekdo-images.com/_al0scMG_pQfGVM31Scf1Q__original/img/h4jBTaOjznJgWELa6tTrfPqqSeA=/0x0/filters:format(jpeg)/pic6107853.jpg'
    },
    {
      text: 'Blood Rage',
      image:
        'https://cf.geekdo-images.com/HkZSJfQnZ3EpS214xtuplg__original/img/Myy6IPDJDzLoPdXrPXVZcddBQoQ=/0x0/filters:format(jpeg)/pic2439223.jpg'
    },
    {
      text: 'Rising Sun',
      image:
        'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__original/img/pKJ1XyLN4hvHim5eRj2VJHijv1E=/0x0/filters:format(jpeg)/pic3880340.jpg'
    },
    {
      text: 'Ankh: Gods of Egypt',
      image:
        'https://cf.geekdo-images.com/_al0scMG_pQfGVM31Scf1Q__original/img/h4jBTaOjznJgWELa6tTrfPqqSeA=/0x0/filters:format(jpeg)/pic6107853.jpg'
    },
    {
      text: 'Blood Rage',
      image:
        'https://cf.geekdo-images.com/HkZSJfQnZ3EpS214xtuplg__original/img/Myy6IPDJDzLoPdXrPXVZcddBQoQ=/0x0/filters:format(jpeg)/pic2439223.jpg'
    },
    {
      text: 'Rising Sun',
      image:
        'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__original/img/pKJ1XyLN4hvHim5eRj2VJHijv1E=/0x0/filters:format(jpeg)/pic3880340.jpg'
    },
    {
      text: 'Ankh: Gods of Egypt',
      image:
        'https://cf.geekdo-images.com/_al0scMG_pQfGVM31Scf1Q__original/img/h4jBTaOjznJgWELa6tTrfPqqSeA=/0x0/filters:format(jpeg)/pic6107853.jpg'
    },
    {
      text: 'Blood Rage',
      image:
        'https://cf.geekdo-images.com/HkZSJfQnZ3EpS214xtuplg__original/img/Myy6IPDJDzLoPdXrPXVZcddBQoQ=/0x0/filters:format(jpeg)/pic2439223.jpg'
    },
    {
      text: 'Rising Sun',
      image:
        'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__original/img/pKJ1XyLN4hvHim5eRj2VJHijv1E=/0x0/filters:format(jpeg)/pic3880340.jpg'
    },
    {
      text: 'Ankh: Gods of Egypt',
      image:
        'https://cf.geekdo-images.com/_al0scMG_pQfGVM31Scf1Q__original/img/h4jBTaOjznJgWELa6tTrfPqqSeA=/0x0/filters:format(jpeg)/pic6107853.jpg'
    },
    {
      text: 'Blood Rage',
      image:
        'https://cf.geekdo-images.com/HkZSJfQnZ3EpS214xtuplg__original/img/Myy6IPDJDzLoPdXrPXVZcddBQoQ=/0x0/filters:format(jpeg)/pic2439223.jpg'
    },
    {
      text: 'Rising Sun',
      image:
        'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__original/img/pKJ1XyLN4hvHim5eRj2VJHijv1E=/0x0/filters:format(jpeg)/pic3880340.jpg'
    },
    {
      text: 'Ankh: Gods of Egypt',
      image:
        'https://cf.geekdo-images.com/_al0scMG_pQfGVM31Scf1Q__original/img/h4jBTaOjznJgWELa6tTrfPqqSeA=/0x0/filters:format(jpeg)/pic6107853.jpg'
    },
    {
      text: 'Blood Rage',
      image:
        'https://cf.geekdo-images.com/HkZSJfQnZ3EpS214xtuplg__original/img/Myy6IPDJDzLoPdXrPXVZcddBQoQ=/0x0/filters:format(jpeg)/pic2439223.jpg'
    },
    {
      text: 'Rising Sun',
      image:
        'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__original/img/pKJ1XyLN4hvHim5eRj2VJHijv1E=/0x0/filters:format(jpeg)/pic3880340.jpg'
    },
    {
      text: 'Ankh: Gods of Egypt',
      image:
        'https://cf.geekdo-images.com/_al0scMG_pQfGVM31Scf1Q__original/img/h4jBTaOjznJgWELa6tTrfPqqSeA=/0x0/filters:format(jpeg)/pic6107853.jpg'
    },
    {
      text: 'Blood Rage',
      image:
        'https://cf.geekdo-images.com/HkZSJfQnZ3EpS214xtuplg__original/img/Myy6IPDJDzLoPdXrPXVZcddBQoQ=/0x0/filters:format(jpeg)/pic2439223.jpg'
    },
    {
      text: 'Rising Sun',
      image:
        'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__original/img/pKJ1XyLN4hvHim5eRj2VJHijv1E=/0x0/filters:format(jpeg)/pic3880340.jpg'
    },
    {
      text: 'Ankh: Gods of Egypt',
      image:
        'https://cf.geekdo-images.com/_al0scMG_pQfGVM31Scf1Q__original/img/h4jBTaOjznJgWELa6tTrfPqqSeA=/0x0/filters:format(jpeg)/pic6107853.jpg'
    },
    {
      text: 'Blood Rage',
      image:
        'https://cf.geekdo-images.com/HkZSJfQnZ3EpS214xtuplg__original/img/Myy6IPDJDzLoPdXrPXVZcddBQoQ=/0x0/filters:format(jpeg)/pic2439223.jpg'
    },
    {
      text: 'Rising Sun',
      image:
        'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__original/img/pKJ1XyLN4hvHim5eRj2VJHijv1E=/0x0/filters:format(jpeg)/pic3880340.jpg'
    },
    {
      text: 'Ankh: Gods of Egypt',
      image:
        'https://cf.geekdo-images.com/_al0scMG_pQfGVM31Scf1Q__original/img/h4jBTaOjznJgWELa6tTrfPqqSeA=/0x0/filters:format(jpeg)/pic6107853.jpg'
    },
    {
      text: 'Rising Sun',
      image:
        'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__original/img/pKJ1XyLN4hvHim5eRj2VJHijv1E=/0x0/filters:format(jpeg)/pic3880340.jpg'
    }
  ])

  const onFinished = (winner) => {
    //console.log(winner)
  }
  return (
    <React.Fragment>
      <WheelComponent
        ref={wheelRef}
        segments={segments}
        onFinished={(winner) => onFinished(winner)}
        buttonText='Spin'
        isOnlyOnce={false}
        size={290}
      />
      <button
        onClick={() => {
          wheelRef.current.spin()
        }}
      >
        SPIN
      </button>
      <button
        onClick={() => {
          setSegments((state) => {
            const newSegments = [
              ...state,
              {
                text: 'addNew',
                image:
                  'https://cf.geekdo-images.com/_al0scMG_pQfGVM31Scf1Q__original/img/h4jBTaOjznJgWELa6tTrfPqqSeA=/0x0/filters:format(jpeg)/pic6107853.jpg'
              }
            ]
            wheelRef.current.redraw(newSegments)
            return newSegments
          })
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setSegments((state) => {
            const newSegments = [...state.slice(0, state.length - 1)]
            wheelRef.current.redraw(newSegments)
            return newSegments
          })
        }}
      >
        -
      </button>
    </React.Fragment>
  )
}

export default App

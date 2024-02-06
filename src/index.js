import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'

function adjust(color, amount) {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color) =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  )
}

const WheelComponent = forwardRef(
  (
    {
      canvasStyle = {},
      segments,
      segColors,
      winningSegment,
      onFinished,
      primaryColor = 'black',
      contrastColor = 'white',
      buttonText = 'Spin',
      isOnlyOnce = true,
      size = 290,
      upDuration = 100,
      downDuration = 1000,
      fontFamily = 'proxima-nova'
    },
    ref
  ) => {
    let currentSegment = { text: '', key: 0 }
    const [isFinished, setFinished] = useState(false)
    let timerHandle = 0
    const timerDelay = segments.length
    let angleCurrent = 0
    let angleDelta = 0
    let canvasContext = null
    let maxSpeed = Math.PI / `${segments.length}`
    const upTime = segments.length * upDuration
    const downTime = segments.length * downDuration
    let spinStart = 0
    let frames = 0
    const centerX = 300
    const centerY = 300
    useEffect(() => {
      wheelInit()
      setTimeout(() => {
        window.scrollTo(0, 1)
      }, 0)
    }, [])

    useEffect(() => {
      initCanvas()
      draw()
    }, [segments])

    const wheelInit = () => {
      initCanvas()
      wheelDraw()
    }

    const initCanvas = () => {
      let canvas = document.getElementById('canvas')
      if (navigator.userAgent.indexOf('MSIE') !== -1) {
        canvas = document.createElement('canvas')
        canvas.setAttribute('id', 'canvas')
        document.getElementById('wheel').appendChild(canvas)
      }
      canvas.width = 600
      canvas.height = 600

      // Get the parent div and set its styles
      const parentDiv = canvas.parentElement
      parentDiv.style.maxWidth = '100%'
      parentDiv.style.objectFit = 'contain'

      canvas.addEventListener('click', spin, false)
      canvasContext = canvas.getContext('2d')
    }

    useImperativeHandle(ref, () => ({
      redraw: () => {
        initCanvas()
      }
    }))

    const spin = () => {
      if (timerHandle === 0) {
        spinStart = new Date().getTime()
        // maxSpeed = Math.PI / ((segments.length*2) + Math.random())
        maxSpeed = Math.PI / segments.length
        frames = 0
        draw()
        timerHandle = setInterval(onTimerTick, timerDelay)
      }
    }
    const onTimerTick = () => {
      frames++
      const duration = new Date().getTime() - spinStart
      let progress = 0
      let finished = false
      if (duration < upTime) {
        progress = duration / upTime
        angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2)
      } else {
        if (winningSegment) {
          if (
            currentSegment.text === winningSegment &&
            frames > segments.length
          ) {
            progress = duration / upTime
            angleDelta =
              maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
            progress = 1
          } else {
            progress = duration / downTime
            angleDelta =
              (maxSpeed / (progress * 10)) *
              Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
          }
        } else {
          progress = duration / downTime
          angleDelta =
            (maxSpeed / (progress * 10)) *
            Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
        }
        if (progress >= 1) finished = true
      }
      draw()
      angleCurrent += angleDelta
      while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2
      if (finished) {
        setFinished(true)
        onFinished(currentSegment)
        clearInterval(timerHandle)
        timerHandle = 0
        angleDelta = 0
      }
    }

    const wheelDraw = () => {
      clear()
      drawWheel()
      drawNeedle()
    }

    const draw = () => {
      clear()
      drawWheel()
      drawNeedle()
    }

    const drawSegment = (key, lastAngle, angle) => {
      const ctx = canvasContext
      const value = segments[key]
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, size, lastAngle, angle, false)
      ctx.lineTo(centerX, centerY)
      ctx.closePath()
      ctx.fillStyle =
        currentSegment.key === key ? adjust(segColors[key], 45) : segColors[key]
      ctx.fill()
      ctx.stroke()
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate((lastAngle + angle) / 2)
      ctx.fillStyle = primaryColor
      ctx.font = 'bold 1em ' + fontFamily
      ctx.fillText(value.substr(0, 21), size / 2 + 20, 0)
      ctx.restore()
    }

    const drawWheel = () => {
      const ctx = canvasContext
      let lastAngle = angleCurrent
      const len = segments.length
      const PI2 = Math.PI * 2
      ctx.lineWidth = 1
      ctx.strokeStyle = primaryColor
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.font = '1em ' + fontFamily
      for (let i = 1; i <= len; i++) {
        const angle = PI2 * (i / len) + angleCurrent
        drawSegment(i - 1, lastAngle, angle)
        lastAngle = angle
      }

      // Draw a center circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, 40, 0, PI2, false)
      ctx.closePath()
      ctx.fillStyle = contrastColor
      ctx.lineWidth = 10
      ctx.strokeStyle = primaryColor
      ctx.fill()
      ctx.font = 'bold 1em ' + fontFamily
      ctx.fillStyle = primaryColor
      ctx.textAlign = 'center'
      ctx.fillText(buttonText, centerX, centerY + 3)
      ctx.stroke()

      // Draw outer circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, size, 0, PI2, false)
      ctx.closePath()

      ctx.lineWidth = 10
      ctx.strokeStyle = primaryColor
      ctx.stroke()
    }

    const drawNeedle = () => {
      const ctx = canvasContext
      ctx.lineWidth = 1
      ctx.strokeStyle = primaryColor
      ctx.fileStyle = primaryColor
      ctx.beginPath()
      ctx.moveTo(centerX + 20, centerY - 40)
      ctx.lineTo(centerX - 20, centerY - 40)
      ctx.lineTo(centerX, centerY - 55)
      ctx.closePath()
      ctx.fill()
      const change = angleCurrent + Math.PI / 2
      let i =
        segments.length -
        Math.floor((change / (Math.PI * 2)) * segments.length) -
        1
      if (i < 0) i = i + segments.length
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = contrastColor
      ctx.font = 'bold 1.5em ' + fontFamily
      currentSegment = { text: segments[i], key: i }
    }
    const clear = () => {
      const ctx = canvasContext
      ctx.clearRect(0, 0, 1000, 800)
    }
    return (
      <div id='wheel'>
        <canvas
          id='canvas'
          style={{
            pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto',
            ...canvasStyle
          }}
        />
      </div>
    )
  }
)
export default WheelComponent

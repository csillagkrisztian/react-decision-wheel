import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'

const WheelComponent = forwardRef(
  (
    {
      canvasStyle = {},
      segments: list,
      winningSegment,
      onFinished,
      primaryColor = '#171D1C',
      contrastColor = '#16BAC5',
      isOnlyOnce = true,
      size = 290,
      fontFamily = 'Verdana (sans-serif)'
    },
    ref
  ) => {
    console.log({
      canvasStyle,
      list,
      winningSegment,
      onFinished,
      primaryColor,
      contrastColor,
      isOnlyOnce,
      size,
      fontFamily
    })
    if (list.length === 0 || !list) {
      list = [
        {
          noData: true,
          text: '',
          image:
            'https://i.ibb.co/Xzss21X/DALL-E-2024-02-13-12-14-00-Small-robot-looking-at-an-empty-wheel-of-fortune-1.jpg'
        }
      ]
    }

    let currentSegment = { text: '', image: '', key: -1 }
    let timerHandle = 0
    let angleCurrent = 0
    let angleDelta = 0
    let canvasContext = null
    let spinStart = 0
    let frames = 0

    const centerX = 300
    const centerY = 300
    const segColors = [
      '#F8333C',
      '#7D53DE',
      '#094D92',
      '#44AF69',
      '#FEE440',
      '#F9A03F'
    ]

    const [isFinished, setFinished] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [segments, setSegments] = useState(list)
    const [images, setImages] = useState([])

    useEffect(() => {
      const imageURL = segments.map((item) => item.image)
      let imageCount = 0
      const newImages = [...images]
      imageURL.forEach((src) => {
        const image = new Image()
        image.src = src
        image.onload = () => {
          imageCount += 1
          if (imageCount === imageURL.length) {
            setLoaded(true)
          }
        }
        newImages.push(image)
        setImages(newImages)
        setLoaded(false)
      })
    }, [segments])

    useEffect(() => {
      if (loaded) {
        const loadedWithImages = list.map((item, index) => {
          return { ...item, image: images[index] }
        })
        setSegments(loadedWithImages)
        setImages([])
        wheelInit(loadedWithImages)
        setTimeout(() => {
          window.scrollTo(0, 1)
        }, 0)
      }
    }, [loaded])

    useEffect(() => {
      if (loaded) {
        initCanvas()
        wheelDraw(segments)
      }
    }, [segments])

    const wheelInit = (segments) => {
      initCanvas()
      wheelDraw(segments)
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
      canvasContext = canvas.getContext('2d')
    }

    useImperativeHandle(ref, () => ({
      spin: () => {
        initCanvas()
        spin(segments)
      },
      redraw: (segments) => {
        setSegments(segments)
        setLoaded(false)
        setImages([])
      }
    }))

    const spin = (segments) => {
      if (timerHandle === 0) {
        spinStart = new Date().getTime()
        const maxSpeed = Math.PI / `${segments.length}`
        frames = 0
        wheelDraw(segments)
        const timerDelay = segments.length
        timerHandle = setInterval(() => {
          onTimerTick(segments, maxSpeed)
        }, timerDelay)
      }
    }
    const onTimerTick = (segments, maxSpeed) => {
      frames++
      const duration = new Date().getTime() - spinStart
      let progress = 0
      let finished = false

      const x1 = 6
      const y1Uptime = 30
      const y1Downtime = 1000
      const x2 = 30
      const y2Uptime = 8
      const y2Downtime = 400
      const x = segments.length

      const uptimeHelper =
        y1Uptime + ((x - x1) * (y2Uptime - y1Uptime)) / (x2 - x1)
      const downtimeHelper =
        y1Downtime + ((x - x1) * (y2Downtime - y1Downtime)) / (x2 - x1)

      const upTime = segments.length * uptimeHelper
      const downTime = segments.length * downtimeHelper

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

          const x1 = 6
          const y1Progress = 30
          const x2 = 30
          const y2Progress = 1
          const x = segments.length
          const progressHelper =
            y1Progress + ((x - x1) * (y2Progress - y1Progress)) / (x2 - x1)
          angleDelta =
            (maxSpeed / (progress * progressHelper)) *
            Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
        }
        if (progress >= 1) finished = true
      }
      wheelDraw(segments)
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

    const wheelDraw = (segments) => {
      clear()
      drawWheel(segments)
      drawNeedle(segments)
    }

    const drawSegment = (segments, key, lastAngle, angle) => {
      const ctx = canvasContext
      const { image, text, noData } = segments[key]

      // Draw the segment
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, size, lastAngle, angle, false)
      ctx.lineTo(centerX, centerY)
      ctx.closePath()
      ctx.fillStyle = noData ? segColors[2] : segColors[key % segColors.length]
      ctx.fill()
      ctx.clip()

      // Create the image
      if (!noData) {
        ctx.translate(centerX, centerY)
        ctx.rotate((lastAngle + angle) / 2)
        ctx.translate(-centerX, -centerY)
        ctx.translate(600, 0)
        ctx.rotate(Math.PI / 2)
        ctx.globalAlpha = currentSegment.key === key ? 0.95 : 0.15
        ctx.translate(150, 15)
        ctx.scale(0.5, 0.5)
        ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.stroke()
        ctx.restore()
      } else {
        ctx.globalAlpha = 0.2
        ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.restore()

        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.fillStyle = '#EFE9F4'
        ctx.font = 'bold 2em Tahoma'
        ctx.shadowColor = primaryColor
        ctx.shadowBlur = 4
        ctx.shadowOffsetX = -0.5
        ctx.shadowOffsetY = 0.5
        ctx.strokeText('Plese Enter a Wheel Item', 0, 100)
        ctx.fillText('Plese Enter a Wheel Item', 0, 100)
        ctx.restore()
      }

      // Draw the text in the segment
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate((lastAngle + angle) / 2)
      ctx.fillStyle = '#EFE9F4'
      ctx.font =
        currentSegment.key === key ? 'bold 1em Tahoma' : 'bold 0.8em Tahoma'
      ctx.shadowColor = primaryColor
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = -0.5
      ctx.shadowOffsetY = 0.5
      ctx.strokeStyle =
        currentSegment.key === key
          ? primaryColor
          : segColors[key % segColors.length] // Change this to the color you want for the stroke
      ctx.lineWidth = currentSegment.key === key ? 4 : 3 // Change this to control the width of the stroke
      ctx.strokeText(text.substr(0, 21), size / 1.7, 0)
      ctx.fillText(text.substr(0, 21), size / 1.7, 0)
      ctx.restore()
    }

    const drawWheel = (segments) => {
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
        drawSegment(segments, i - 1, lastAngle, angle)
        lastAngle = angle
      }

      // Draw a center circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, 35, 0, PI2, false)
      ctx.closePath()
      ctx.fillStyle = primaryColor
      ctx.lineWidth = 10
      ctx.strokeStyle = primaryColor
      ctx.fill()
      ctx.stroke()

      // Draw outer circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, size, 0, PI2, false)
      ctx.closePath()
      ctx.lineWidth = 13
      ctx.strokeStyle = primaryColor
      ctx.stroke()
    }

    const drawNeedle = (segments) => {
      const ctx = canvasContext
      ctx.lineWidth = 1
      ctx.strokeStyle = primaryColor
      ctx.fillStyle = primaryColor
      ctx.beginPath()
      ctx.moveTo(centerX + 13, centerY - 30)
      ctx.lineTo(centerX - 13, centerY - 30)
      ctx.lineTo(centerX, centerY - 100)
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
      currentSegment = { ...segments[i], key: i }
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

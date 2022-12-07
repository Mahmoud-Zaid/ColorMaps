import { useEffect, useRef } from 'react'
import './style.css'
import WorldMap from './world-svg.js'
import Tcolor from './tcolor.js'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

let width
let height

function Tpos() {
  const svg = useRef()
  const button = useRef()
  const canv = useRef()

  const handleDownload = () => {
    width = svg.current.getBoundingClientRect().width
    height = svg.current.getBoundingClientRect().height
    //-----------------------------------------
    svg.current.setAttribute('width', width)
    svg.current.setAttribute('height', height)
    canv.current.width = width
    canv.current.height = height
    let data = new XMLSerializer().serializeToString(svg.current)
    let win = window.URL || window.webkitURL || window
    let img = new Image()
    let blob = new Blob([data], { type: 'image/svg+xml' })
    let url = win.createObjectURL(blob)
    img.onload = function () {
      canv.current.getContext('2d').drawImage(img, 0, 0)
      win.revokeObjectURL(url)
      let uri = canv.current
        .toDataURL('image/png')
        .replace('image/png', 'octet/stream')
      let a = document.createElement('a')
      document.body.appendChild(a)
      a.style = 'display: none'
      a.href = uri
      a.download =
        (svg.current.id ||
          svg.current.getAttribute('name') ||
          svg.current.getAttribute('aria-label') ||
          'untitled') + '.png'
      a.click()
      window.URL.revokeObjectURL(uri)
      document.body.removeChild(a)
    }
    img.src = url
  }
  /*
  useEffect(() => {
    handleDownload()
  }, [])
*/
  useEffect(() => {
    button.current.addEventListener('click', handleDownload)
  }, [])

  return (
    <div style={{ border: '2px solid black' }}>
      <Tcolor>
        <TransformWrapper>
          <TransformComponent>
            <WorldMap ref={svg} />
          </TransformComponent>
        </TransformWrapper>
      </Tcolor>
      <button
        style={{
          border: 'soild',
          color: 'red',
          padding: '15px 32px',
          display: 'inline-block',
          margin: '4px 2px',
          cursor: 'pointer',
        }}
        ref={button}
      >
        Download
      </button>
      <div>
        <canvas ref={canv}></canvas>
      </div>
    </div>
  )
}

export default Tpos

function Tcolor({ children, color }) {
  const handleColorChange = (event) => {
    event.preventDefault()
    if (event.target.nodeName === 'path' && !(event.target.id === 'ocean')) {
      if (!event.target.style.fill) {
        event.target.style.fill = color.hex
      } else {
        event.target.style.fill = ''
      }
    }
  }

  return <div onClick={handleColorChange}>{children}</div>
}

export default Tcolor

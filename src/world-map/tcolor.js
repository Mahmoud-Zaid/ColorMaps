function Tcolor({ children }) {
  const handleColorChange = (event) => {
    event.preventDefault()
    if (event.target.nodeName === 'path' && !(event.target.id === 'ocean')) {
      if (!event.target.style.fill) {
        event.target.style.fill = 'red'
      } else {
        event.target.style.fill = ''
      }
    }
  }

  return <div onClick={handleColorChange}>{children}</div>
}

export default Tcolor

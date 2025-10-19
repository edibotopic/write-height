'use strict'

// Drag and drop functionality for canvas
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('renderCanvas')
  const renderContainer = document.querySelector('.render-container')

  // Prevent default drag behaviors
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    canvas.addEventListener(eventName, preventDefaults, false)
    renderContainer.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
  })

  function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  // Highlight drop zone when item is dragged over it
  ;['dragenter', 'dragover'].forEach(eventName => {
    canvas.addEventListener(eventName, highlight, false)
    renderContainer.addEventListener(eventName, highlight, false)
  })

  ;['dragleave', 'drop'].forEach(eventName => {
    canvas.addEventListener(eventName, unhighlight, false)
    renderContainer.addEventListener(eventName, unhighlight, false)
  })

  function highlight(e) {
    canvas.style.opacity = '0.7'
  }

  function unhighlight(e) {
    canvas.style.opacity = '1'
  }

  // Handle dropped files
  canvas.addEventListener('drop', handleDrop, false)
  renderContainer.addEventListener('drop', handleDrop, false)

  function handleDrop(e) {
    const dt = e.dataTransfer
    const files = dt.files

    if (files.length > 0) {
      const file = files[0]
      // Check if it's an image
      if (file.type.startsWith('image/')) {
        const image = document.getElementById('output')
        image.src = URL.createObjectURL(file)
        meshify()
      }
    }
  }
})

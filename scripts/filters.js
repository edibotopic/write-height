'use strict'

var blurAmount = 0
var contrastAmount = 100
var brightnessAmount = 100
var originalImageSrc = null
var filterTimeout = null

window.addEventListener('DOMContentLoaded', () => {
  const blurSlider = document.getElementById('blurSlider')
  const blurValue = document.getElementById('blurValue')
  const contrastSlider = document.getElementById('contrastSlider')
  const contrastValue = document.getElementById('contrastValue')
  const brightnessSlider = document.getElementById('brightnessSlider')
  const brightnessValue = document.getElementById('brightnessValue')

  blurSlider.addEventListener('input', (e) => {
    blurAmount = parseInt(e.target.value)
    blurValue.textContent = blurAmount
    debouncedFilterApply()
  })

  contrastSlider.addEventListener('input', (e) => {
    contrastAmount = parseInt(e.target.value)
    contrastValue.textContent = contrastAmount + '%'
    debouncedFilterApply()
  })

  brightnessSlider.addEventListener('input', (e) => {
    brightnessAmount = parseInt(e.target.value)
    brightnessValue.textContent = brightnessAmount + '%'
    debouncedFilterApply()
  })
})

function debouncedFilterApply() {
  if (filterTimeout) {
    clearTimeout(filterTimeout)
  }
  filterTimeout = setTimeout(() => {
    applyFiltersAndRegenerate()
  }, 150)
}

function storeOriginalImage(src) {
  if (!originalImageSrc || originalImageSrc === src) {
    originalImageSrc = src
  }
}

function applyFiltersAndRegenerate() {
  const sourceImage = document.getElementById('output')
  if (!sourceImage.src) return

  // Store original on first filter application
  if (!originalImageSrc) {
    originalImageSrc = sourceImage.src
  }

  // Create a canvas to apply filters
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // Load the ORIGINAL image (not the filtered one)
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height

    // Build filter string
    let filters = []
    if (blurAmount > 0) {
      filters.push(`blur(${blurAmount}px)`)
    }
    if (contrastAmount !== 100) {
      filters.push(`contrast(${contrastAmount}%)`)
    }
    if (brightnessAmount !== 100) {
      filters.push(`brightness(${brightnessAmount}%)`)
    }

    ctx.filter = filters.length > 0 ? filters.join(' ') : 'none'
    ctx.drawImage(img, 0, 0)

    // Update the source image with filtered version
    sourceImage.src = canvas.toDataURL()

    // Regenerate the mesh
    meshify()
  }
  img.src = originalImageSrc
}

function resetOriginalImage() {
  originalImageSrc = null
}

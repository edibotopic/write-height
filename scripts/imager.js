'use strict'

let imageCreate = () => {
  // Load image and create mesh on startup
  window.onload = () => {
    getRndImg()
    meshify()
  }

  // Load image and create mesh on button click
  const refresh = document.querySelector('#refresh')
  refresh.addEventListener('click', () => {
    getRndImg()
    meshify()
    if (typeof updateButtonStates === 'function') {
      updateButtonStates()
    }
  })

  // Builtin image examples
  const imgs = [
    'demos/demo1.png',
    'demos/demo2.png',
    'demos/natural1.png',
    'demos/natural2.png',
    'demos/natural3.png',
    'demos/natural4.png',
    'demos/natural5.png',
    'demos/natural6.png',
  ]

  // Generate random image
  let oldImg = []
  let imgCount = 0

  let getRndImg = () => {
    const currentSrc = document.getElementById('output').src
    let rnd = Math.floor(Math.random() * imgs.length)

    // Don't pick the current image or previously shown images
    if (!oldImg[rnd] && !currentSrc.includes(imgs[rnd])) {
      document.getElementById('output').src = imgs[rnd]
      resetOriginalImage()
      heightGradientState = false
      const heightGradientBtn = document.getElementById('heightGradient')
      if (heightGradientBtn) {
        heightGradientBtn.classList.remove('disabled')
      }
      oldImg[rnd] = true
      imgCount++
      if (imgCount === imgs.length) {
        imgCount = 0
        oldImg = {}
      }
    } else {
      getRndImg()
    }
  }
}

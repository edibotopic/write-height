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
    'demos/natural7.png',
    'demos/tech1.jpg',
    'demos/tech2.jpg',
    'demos/tech3.jpg',
  ]

  // Generate random image
  let oldImg = []
  let imgCount = 0

  let getRndImg = () => {
    let rnd = Math.floor(Math.random() * imgs.length)
    if (!oldImg[rnd]) {
      document.getElementById('output').src = imgs[rnd]
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

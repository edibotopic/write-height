window.onload = () => {
  getRndImg()
  meshify()
}

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

getRndImg = () => {
  var rnd = Math.floor(Math.random() * imgs.length)
  document.getElementById('output').src = imgs[rnd]
}

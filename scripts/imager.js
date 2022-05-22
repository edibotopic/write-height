window.onload = () => {
  getRndImg()
  meshify()
}

const imgs = [
  '../demos/demo1.png',
  '../demos/demo2.png',
  '../demos/natural1.png',
  '../demos/natural2.png',
  '../demos/natural3.png',
  '../demos/natural4.png',
  '../demos/natural5.png',
  '../demos/natural6.png',
  '../demos/natural7.png',
  '../demos/tech1.png',
  '../demos/tech2.png',
  '../demos/tech3.png',
  '../demos/tech4.png',
]

getRndImg = () => {
  var rnd = Math.floor(Math.random() * imgs.length)
  document.getElementById('output').src = imgs[rnd]
}

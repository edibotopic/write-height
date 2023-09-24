'use strict'

let canvasCreate = () => {
  const canvas = document.getElementById('renderCanvas')
  return canvas
}

let engineCreate = () => {
  const engine = new BABYLON.Engine(canvas, true)
  return engine
}

let sceneCreate = (engine) => {
  const scene = new BABYLON.Scene(engine)
  scene.clearColor = BABYLON.Color3.Black()
  return scene
}

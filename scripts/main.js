'use strict'

let meshify = () => {
  const canvas = document.getElementById('renderCanvas')
  const engine = new BABYLON.Engine(canvas, true)

  let createScene = () => {
    let scene = new BABYLON.Scene(engine)
    scene.clearColor = BABYLON.Color3.Black()

    let image = document.getElementById('output')

    imageCreate()

    cameraCreate(canvas, scene)

    lightsCreate(scene)

    groundCreate(scene)

    let model = mapCreate(image, scene)

    let defaultMaterial = materialCreate(model, scene)

    guiCreate(defaultMaterial, model, scene)

    return scene
  }

  const scene = createScene()

  engine.runRenderLoop(function () {
    scene.render()
  })
  window.addEventListener('resize', function () {
    engine.resize()
  })
}

meshify()

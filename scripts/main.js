'use strict'

const canvas = canvasCreate()
const engine = engineCreate()
const scene = sceneCreate(engine)

cameraCreate(canvas, scene)
lightsCreate(scene)

let rotate

let meshify = () => {
  rotate = false

  const image = document.getElementById('output')
  imageCreate()

  const model = mapCreate(image, scene)
  const defaultMaterial = materialCreate(model, scene)
  guiCreate(defaultMaterial, model, scene)

  groundCreate(scene)
}

engine.runRenderLoop(() => {
  scene.render()
  if (rotate == true && scene.meshes[0]) {
    scene.meshes[0].rotation.y += 0.0009
  } else if (rotate == false && scene.meshes[0]) {
    scene.meshes[0].rotation.y += 0.0
  }
})

window.addEventListener('resize', () => {
  engine.resize()
})

meshify()

'use strict'

const canvas = canvasCreate()
const engine = engineCreate()
const scene = sceneCreate(engine)

cameraCreate(canvas, scene)
lightsCreate(scene)

let rotate
var subdivisions = 200
var wireframeState = false
var gridState = false
var turntableState = false
var invertHeightmap = false
var heightGradientState = false
var currentColor = new BABYLON.Color3(0.8, 0.8, 0.8)
var currentRotationY = 0
var currentModel = null
var currentLODPanel = null

let regenerateMesh = () => {
  // Save current rotation from the heightmap model (not the grid!)
  const existingModel = scene.getMeshByName('gdhm')
  if (existingModel) {
    currentRotationY = existingModel.rotation.y
  }

  const image = document.getElementById('output')
  const model = mapCreate(image, scene, subdivisions)
  const defaultMaterial = materialCreate(model, scene)

  // Store model globally so checkboxes can reference it
  currentModel = model

  // Reapply saved states
  defaultMaterial.diffuseColor = currentColor
  model.material.wireframe = wireframeState
  model.rotation.y = currentRotationY
  rotate = turntableState

  // Apply height gradient if enabled
  if (heightGradientState) {
    applyHeightGradient(model)
  }

  // Ensure grid exists
  let ground = scene.getMeshByName('grid')
  if (!ground) {
    ground = groundCreate(scene)
  }
  ground.setEnabled(gridState)

  return { model, defaultMaterial }
}

let meshify = () => {
  // Save current rotation from the heightmap model before loading new image
  const existingModel = scene.getMeshByName('gdhm')
  if (existingModel) {
    currentRotationY = existingModel.rotation.y
  }

  // Don't reset states - preserve user preferences
  const image = document.getElementById('output')
  imageCreate()

  const { model, defaultMaterial } = regenerateMesh()

  // Store model globally
  currentModel = model

  guiCreate(defaultMaterial, model, image)

  // Grid is created in regenerateMesh if needed, no need to create again
}

engine.runRenderLoop(() => {
  scene.render()
  if (rotate == true && currentModel) {
    currentModel.rotation.y += 0.0009
  }
})

window.addEventListener('resize', () => {
  engine.resize()
})

meshify()

import 'pepjs'
import { Color3 } from '@babylonjs/core'
import { canvasCreate, engineCreate, sceneCreate } from './init.js'
import { cameraCreate } from './camera.js'
import { lightsCreate } from './lights.js'
import { materialCreate, applyHeightGradient } from './material.js'
import { mapCreate } from './map.js'
import { groundCreate } from './ground.js'
import { guiCreate } from './gui.js'
import { imageCreate } from './imager.js'
import { setupDragDrop } from './dragdrop.js'
import { setupFilters, resetOriginalImage } from './filters.js'

// Initialize canvas, engine and scene
const canvas = canvasCreate()
const engine = engineCreate(canvas)
const scene = sceneCreate(engine)

cameraCreate(canvas, scene)
lightsCreate(scene)

// Global state
let state = {
  rotate: false,
  subdivisions: 200,
  wireframeState: false,
  gridState: false,
  turntableState: false,
  invertHeightmap: false,
  heightGradientState: false,
  currentColor: new Color3(0.8, 0.8, 0.8),
  currentRotationY: 0,
  currentModel: null,
  currentLODPanel: null,
  regenerateMesh: null
}

let regenerateMesh = () => {
  // Save current rotation from the heightmap model (not the grid!)
  const existingModel = scene.getMeshByName('gdhm')
  if (existingModel) {
    state.currentRotationY = existingModel.rotation.y
  }

  const image = document.getElementById('output')
  const model = mapCreate(image, scene, state.subdivisions, state.invertHeightmap)
  const defaultMaterial = materialCreate(model, scene)

  // Store model globally so checkboxes can reference it
  state.currentModel = model

  // Reapply saved states
  defaultMaterial.diffuseColor = state.currentColor
  model.material.wireframe = state.wireframeState
  model.rotation.y = state.currentRotationY
  state.rotate = state.turntableState

  // Apply height gradient if enabled
  if (state.heightGradientState) {
    applyHeightGradient(model)
  }

  // Ensure grid exists
  let ground = scene.getMeshByName('grid')
  if (!ground) {
    ground = groundCreate(scene)
  }
  ground.setEnabled(state.gridState)

  return { model, defaultMaterial }
}

state.regenerateMesh = regenerateMesh

let meshify = () => {
  // Save current rotation from the heightmap model before loading new image
  const existingModel = scene.getMeshByName('gdhm')
  if (existingModel) {
    state.currentRotationY = existingModel.rotation.y
  }

  // Don't reset states - preserve user preferences
  const image = document.getElementById('output')

  const { model, defaultMaterial } = regenerateMesh()

  // Store model globally
  state.currentModel = model

  guiCreate(defaultMaterial, model, image, scene, state)

  // Grid is created in regenerateMesh if needed, no need to create again
}

// Set up all components
imageCreate(meshify, resetOriginalImage, state)
setupDragDrop(meshify, resetOriginalImage, state)
setupFilters(meshify)

// Render loop
engine.runRenderLoop(() => {
  scene.render()
  if (state.rotate == true && state.currentModel) {
    state.currentModel.rotation.y += 0.0009
  }
})

window.addEventListener('resize', () => {
  engine.resize()
})

// Expose functions and state to window for inline HTML scripts
window.meshify = meshify
window.regenerateMesh = regenerateMesh
window.resetOriginalImage = resetOriginalImage
window.applyHeightGradient = applyHeightGradient
window.state = state
// Expose state properties directly for backward compatibility
Object.defineProperty(window, 'invertHeightmap', {
  get: () => state.invertHeightmap,
  set: (value) => { state.invertHeightmap = value }
})
Object.defineProperty(window, 'heightGradientState', {
  get: () => state.heightGradientState,
  set: (value) => { state.heightGradientState = value }
})
Object.defineProperty(window, 'currentModel', {
  get: () => state.currentModel,
  set: (value) => { state.currentModel = value }
})
Object.defineProperty(window, 'currentLODPanel', {
  get: () => state.currentLODPanel,
  set: (value) => { state.currentLODPanel = value }
})

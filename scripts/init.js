import { Engine, Scene, Color3 } from '@babylonjs/core'

export let canvasCreate = () => {
  const canvas = document.getElementById('renderCanvas')
  return canvas
}

export let engineCreate = (canvas) => {
  const engine = new Engine(canvas, true)
  return engine
}

export let sceneCreate = (engine) => {
  const scene = new Scene(engine)
  scene.clearColor = Color3.Black()
  return scene
}

'use strict'

let groundCreate = (scene) => {
  let ground = BABYLON.MeshBuilder.CreatePlane(
    'grid',
    { width: 100, height: 100, subdivisions: 10 },
    scene
  )

  ground.position = new BABYLON.Vector3(0, -0.1, 0)
  ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0)
  const gridMaterial = new BABYLON.GridMaterial('gridMaterial', scene)
  gridMaterial.mainColor = new BABYLON.Color3(0.8, 0.4, 0.8)
  gridMaterial.lineColor = new BABYLON.Color3(2, 1, 2)
  gridMaterial.opacity = 0.9
  ground.material = gridMaterial

  return ground
}

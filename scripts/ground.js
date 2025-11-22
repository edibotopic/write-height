import { MeshBuilder, Vector3, Color3 } from '@babylonjs/core'
import { GridMaterial } from '@babylonjs/materials'

export let groundCreate = (scene) => {
  const ground = MeshBuilder.CreatePlane(
    'grid',
    { width: 100, height: 100, subdivisions: 10 },
    scene
  )

  ground.position = new Vector3(0, -0.1, 0)
  ground.rotation = new Vector3(Math.PI / 2, 0, 0)
  const gridMaterial = new GridMaterial('gridMaterial', scene)
  gridMaterial.mainColor = new Color3(0.8, 0.4, 0.8)
  gridMaterial.lineColor = new Color3(2, 1, 2)
  gridMaterial.opacity = 0.8
  ground.material = gridMaterial

  return ground
}

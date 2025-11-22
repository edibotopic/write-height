import { MeshBuilder } from '@babylonjs/core'

export let mapCreate = (image, scene, subdivisions = 200, invertHeightmap = false) => {
  // Only dispose the heightmap model, not the grid
  const existingModel = scene.getMeshByName('gdhm')
  if (existingModel) {
    existingModel.dispose(false, true)
  }

  const model = MeshBuilder.CreateGroundFromHeightMap(
    'gdhm',
    image.src,
    {
      width: 20,
      height: 20,
      subdivisions: subdivisions,
      maxHeight: invertHeightmap ? 0 : 4,
      minHeight: invertHeightmap ? 4 : 0
    },
    scene,
    false
  )

  return model
}

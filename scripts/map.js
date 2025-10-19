'use strict'

let mapCreate = (image, scene, subdivisions = 200) => {
  // Only dispose the heightmap model, not the grid
  const existingModel = scene.getMeshByName('gdhm')
  if (existingModel) {
    existingModel.dispose(false, true)
  }

  const model = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
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

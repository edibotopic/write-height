'use strict'

let mapCreate = (image, scene) => {
  while (scene.meshes.length) {
    let model = scene.meshes[0]
    model.dispose(false, true)
    model = null
  }

  const model = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
    'gdhm',
    image.src,
    {
      width: 20,
      height: 20,
      subdivisions: 200,
      maxHeight: 4,
      minHeight: 0,
    },
    scene
    //true
  )

  return model
}

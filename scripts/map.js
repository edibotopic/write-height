'use strict'

let mapCreate = (image, scene) => {
  while (scene.meshes.length) {
    let mesh = scene.meshes[0]
    mesh.dispose()
    mesh = null
  }

  const detail = 250

  const model = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
    'gdhm',
    image.src,
    {
      width: 20,
      height: 20,
      subdivisions: detail,
      maxHeight: 4,
      minHeight: 0,
    },
    scene
    // true
  )
  model.position = new BABYLON.Vector3(0, 0, 0)
  model.rotation = new BABYLON.Vector3(0, Math.PI, 0)

  return model
}

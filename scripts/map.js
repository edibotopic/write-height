let mapCreate = (image, scene) => {
  let detail = 250
  let model = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
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

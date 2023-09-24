'use strict'

let cameraCreate = (canvas, scene) => {
  let cameraArc = new BABYLON.ArcRotateCamera(
    'CameraArc',
    0,
    0,
    10,
    new BABYLON.Vector3(0, 0, 0),
    scene
  )

  cameraArc.setPosition(new BABYLON.Vector3(-20.0, 0.7, 40))
  cameraArc.attachControl(canvas, false)
  cameraArc.lowerBetaLimit = 0.5
  cameraArc.upperBetaLimit = 1.0
  cameraArc.lowerRadiusLimit = 15
  cameraArc.upperRadiusLimit = 40
  // cameraArc.inertia = 0;
  // cameraArc.panningInertia = 0;

  return cameraArc
}

'use strict'

let lightsCreate = (scene) => {
    let lightMain = new BABYLON.HemisphericLight(
      'lightMain',
      new BABYLON.Vector3(0.8, 0.1, 0.5),
      scene
    )
    lightMain.diffuse = new BABYLON.Color3(1, 0.9, 0.9)
    lightMain.intensity = 0.8

    let lightPink = new BABYLON.DirectionalLight(
      'lightPink',
      new BABYLON.Vector3(0.0, -1, 0),
      scene
    )
    lightPink.specular = new BABYLON.Color3(0.4, 0.0, 0.6)
    lightPink.intensity = 0.2

    let lightBlue = new BABYLON.DirectionalLight(
      'lightBlue',
      new BABYLON.Vector3(0.5, -0.2, 0),
      scene
    )
    lightBlue.specular = new BABYLON.Color3(0.2, 0.1, 0.8)
    lightBlue.intensity = 0.2

    return lightMain, lightBlue, lightPink

}

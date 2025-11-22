import { HemisphericLight, DirectionalLight, Vector3, Color3 } from '@babylonjs/core'

export let lightsCreate = (scene) => {
  let lightMain = new HemisphericLight(
    'lightMain',
    new Vector3(0.8, 0.1, 0.5),
    scene
  )
  lightMain.diffuse = new Color3(1, 0.9, 0.9)
  lightMain.intensity = 0.7

  let lightPink = new DirectionalLight(
    'lightPink',
    new Vector3(0.0, -1, 0),
    scene
  )
  lightPink.specular = new Color3(0.4, 0.1, 0.6)
  lightPink.intensity = 0.3

  let lightBlue = new DirectionalLight(
    'lightBlue',
    new Vector3(0.5, -0.2, 0),
    scene
  )
  lightBlue.specular = new Color3(0.2, 0.1, 0.9)
  lightBlue.intensity = 0.2

  return lightMain, lightBlue, lightPink
}

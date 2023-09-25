'use strict'

let materialCreate = (model, scene) => {
    const defaultMaterial = new BABYLON.StandardMaterial(
      'defaultMaterial',
      scene
    )

    const COLOR = new BABYLON.Color3(0.8, 0.8, 0.8)
    defaultMaterial.diffuseColor = COLOR
    model.material = defaultMaterial

    return defaultMaterial
}

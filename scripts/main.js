function meshify() {
  const canvas = document.getElementById('renderCanvas')
  const engine = new BABYLON.Engine(canvas, true)

  var createScene = function () {
    var scene = new BABYLON.Scene(engine)
    scene.clearColor = BABYLON.Color3.Black()

    // var camera = new BABYLON.FreeCamera(
    //   'camera1',
    //   new BABYLON.Vector3(0, 20, -20),
    //   scene
    // )
    // camera.setTarget(BABYLON.Vector3.Zero())
    // camera.attachControl(canvas, true)

    var cameraArc = new BABYLON.ArcRotateCamera(
      'CameraArc',
      0,
      0,
      20,
      new BABYLON.Vector3(0, 0, 0),
      scene
    )

    cameraArc.setPosition(new BABYLON.Vector3(10, 20, 10))
    cameraArc.attachControl(canvas, true)

    // Camera constraints
    cameraArc.lowerBetaLimit = 0.5
    cameraArc.upperBetaLimit = 1.0
    cameraArc.lowerRadiusLimit = 15
    cameraArc.upperRadiusLimit = 30

    var light = new BABYLON.HemisphericLight(
      'light',
      new BABYLON.Vector3(0.2, 0.1, 0.5),
      scene
    )
    light.intensity = 0.8

    let image = document.getElementById('output')

    // let base = BABYLON.MeshBuilder.CreateBox('base', {
    //   height: 2,
    //   width: 20,
    //   depth: 20,
    // })
    // base.position = new BABYLON.Vector3(0, 0, 0)

    let detail = 400 // TODO connect to a slider
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

    const defaultMaterial = new BABYLON.StandardMaterial(
      'defaultMaterial',
      scene
    )
    defaultMaterial.diffuseColor = new BABYLON.Color3(0.3, 1, 0.7)
    defaultMaterial.diffuseTexture = new BABYLON.Texture(
      './textures/plaster/PaintedPlaster017_1K_Color.png',
      scene
    )
    defaultMaterial.normalTexture = new BABYLON.Texture(
      './textures/plaster/PaintedPlaster017_1K_NormalGL.png',
      scene
    )
    defaultMaterial.glossiness = 0.0
    model.material = defaultMaterial
    model.material.wireframe = false

    var advancedTexture =
      BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
    var UiPanel = new BABYLON.GUI.StackPanel()
    UiPanel.width = '110px'
    UiPanel.fontSize = '16px'
    UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
    advancedTexture.addControl(UiPanel)

    button = BABYLON.GUI.Button.CreateSimpleButton('but111', 'GLB')
    button.paddingTop = '10px'
    button.width = '50px'
    button.height = '50px'
    button.color = 'white'
    button.background = 'orange'
    button.onPointerDownObservable.add(function () {
      BABYLON.GLTF2Export.GLBAsync(scene, 'YourMesh').then((glb) => {
        glb.downloadFiles()
      })
    })
    UiPanel.addControl(button)

    button = BABYLON.GUI.Button.CreateSimpleButton('but111', 'STL')
    button.paddingTop = '10px'
    button.width = '50px'
    button.height = '50px'
    button.color = 'white'
    button.background = 'blue'
    button.onPointerDownObservable.add(function () {
      const data_stl = BABYLON.STLExport.CreateSTL([model])
      const a = document.createElement('a')

      a.href = window.URL.createObjectURL(
        new Blob([data_stl], { type: 'text/plain' })
      )
      a.download = 'YourMesh.stl'
      document.body.appendChild(a)

      a.click()
      document.body.removeChild(a)
    })
    UiPanel.addControl(button)

    button = BABYLON.GUI.Button.CreateSimpleButton('but111', 'OBJ')
    button.paddingTop = '10px'
    button.width = '50px'
    button.height = '50px'
    button.color = 'white'
    button.background = 'green'
    button.onPointerDownObservable.add(function () {
      const data_obj = BABYLON.OBJExport.OBJ([model])
      const a = document.createElement('a')

      a.href = window.URL.createObjectURL(
        new Blob([data_obj], { type: 'text/plain' })
      )
      a.download = 'YourMesh.obj'
      document.body.appendChild(a)

      a.click()
      document.body.removeChild(a)
    })
    UiPanel.addControl(button)

    // var panel = new BABYLON.GUI.StackPanel()
    // panel.width = '550px'
    // panel.fontSize = '14px'
    // panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    // panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
    // advancedTexture.addControl(panel)
    //
    // let checkbox = new BABYLON.GUI.Checkbox()
    // checkbox.width = '20px'
    // checkbox.height = '20px'
    // checkbox.isChecked = false;
    // checkbox.color = 'orange'
    // checkbox.onIsCheckedChangedObservable.add(function () {
    //   if (checkbox.isChecked = true) {
    //         model.material.wireframe = true}
    //         else {model.material.wireframe = false}
    // })
    //
    // var panelForCheckbox = BABYLON.GUI.Control.AddHeader(
    //   checkbox,
    //   'Wire-frame',
    //   '180px',
    //   { isHorizontal: true, controlFirst: true }
    // )
    // panelForCheckbox.color = 'white'
    // panelForCheckbox.height = '20px'
    // panelForCheckbox.horizontalAlignment =
    //   BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    // panel.addControl(panelForCheckbox)
    //
    // let header = new BABYLON.GUI.TextBlock()
    // header.text = 'Change detail'
    // header.height = '40px'
    // header.color = 'white'
    // header.textHorizontalAlignment =
    //   BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    // header.marginTop = '10px'
    // panel.addControl(header)
    //
    // let slider
    // createSlider = () => {
    //   slider = new BABYLON.GUI.Slider()
    //   slider.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    //   slider.minimum = 100
    //   slider.maximum = 400
    //   slider.color = 'orange'
    //   slider.value = detail
    //   slider.height = '20px'
    //   slider.width = '200px'
    //   slider.onValueChangedObservable.add(function (value) {
    //     header.text = 'Sub-divisions: ' + value
    //     model.subdivisions = value
    //   })
    //   return slider
    // }
    //
    // createSlider()
    // panel.addControl(slider)

    return scene
  }

  const scene = createScene()

  engine.runRenderLoop(function () {
    scene.render()
  })
  window.addEventListener('resize', function () {
    engine.resize()
  })
}

meshify()

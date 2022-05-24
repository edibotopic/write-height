let gui = 0

let activateButtons = () => {
  gui = 1
}

// let step =1;
//
// let pulse = (step,extent) => {
//     step += 1;
//   return Math.sin(step*extent)
// }

let meshify = () => {
  const canvas = document.getElementById('renderCanvas')
  const engine = new BABYLON.Engine(canvas, true)

  var createScene = function () {
    var scene = new BABYLON.Scene(engine)
    scene.clearColor = BABYLON.Color3.Black()

    var cameraArc = new BABYLON.ArcRotateCamera(
      'CameraArc',
      0,
      0,
      20,
      new BABYLON.Vector3(0, 0, 0),
      scene
    )

    cameraArc.setPosition(new BABYLON.Vector3(10, 20, 10))
    cameraArc.attachControl(canvas, false)

    // Camera constraints
    cameraArc.lowerBetaLimit = 0.5
    cameraArc.upperBetaLimit = 1.0
    cameraArc.lowerRadiusLimit = 15
    cameraArc.upperRadiusLimit = 30

    var lightMain = new BABYLON.HemisphericLight(
      'lightMain',
      new BABYLON.Vector3(0.2, 0.1, 0.5),
      scene
    )
    lightMain.diffuse = new BABYLON.Color3(1, 0.9, 0.9)
    lightMain.intensity = 0.8

    var lightPink = new BABYLON.DirectionalLight(
      'lightPink',
      new BABYLON.Vector3(0.0, -1, 0),
      scene
    )
    lightPink.specular = new BABYLON.Color3(0.4, 0.0, 0.6)
    lightPink.intensity = 0.2

    var lightBlue = new BABYLON.DirectionalLight(
      'lightBlue',
      new BABYLON.Vector3(0.5, -0.2, 0),
      scene
    )
    lightBlue.specular = new BABYLON.Color3(0.2, 0.1, 0.8)
    lightBlue.intensity = 0.2

    let image = document.getElementById('output')
    let ground = BABYLON.MeshBuilder.CreatePlane(
      'grid',
      { width: 100, height: 100, subdivisions: 10 },
      scene
    )

    ground.position = new BABYLON.Vector3(0, -0.1, 0)
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0)
    const gridMaterial = new BABYLON.GridMaterial('gridMaterial', scene)
    gridMaterial.mainColor = new BABYLON.Color3(0.8, 0.4, 0.8)
    gridMaterial.lineColor = new BABYLON.Color3(2, 1, 2)
    gridMaterial.opacity = 0.9
    ground.material = gridMaterial

    let detail = 500
    let model = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
      'gdhm',
      image.src,
      {
        width: 20,
        height: 20,
        subdivisions: detail,
        maxHeight: 4,
        minHeight: 0,
        // colorFilter: new BABYLON.Color3(1,1,1) NOTE: what does this do?
      },
      scene
      // true
    )
    model.position = new BABYLON.Vector3(0, 0, 0)

    const defaultMaterial = new BABYLON.StandardMaterial(
      'defaultMaterial',
      scene
    )
    defaultMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1)
    model.material = defaultMaterial
    model.material.wireframe = false

    //Canvas GUI
    let showButtons = () => {
      if (gui == 1) {
        var advancedTexture =
          BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
        var UiPanel = new BABYLON.GUI.StackPanel()
        UiPanel.width = '110px'
        UiPanel.fontSize = '16px'
        UiPanel.horizontalAlignment =
          BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
        UiPanel.verticalAlignment =
          BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
        advancedTexture.addControl(UiPanel)

        let buttonBackGroundGLB = new BABYLON.GUI.Rectangle('')
        buttonBackGroundGLB.color = ''
        buttonBackGroundGLB.thickness = 0
        buttonBackGroundGLB.background = 'black'
        buttonBackGroundGLB.alpha = 0.5
        buttonBackGroundGLB.zIndex = -1

        let buttonBackGroundSTL = new BABYLON.GUI.Rectangle('')
        buttonBackGroundSTL.color = ''
        buttonBackGroundSTL.thickness = 0
        buttonBackGroundSTL.background = 'black'
        buttonBackGroundSTL.alpha = 0.5
        buttonBackGroundSTL.zIndex = -1

        let buttonBackGroundOBJ = new BABYLON.GUI.Rectangle('')
        buttonBackGroundOBJ.color = ''
        buttonBackGroundOBJ.thickness = 0
        buttonBackGroundOBJ.background = 'black'
        buttonBackGroundOBJ.alpha = 0.5
        buttonBackGroundOBJ.zIndex = -1

        let buttonGLB = BABYLON.GUI.Button.CreateSimpleButton('but111', 'GLB')
        buttonGLB.paddingTop = '10px'
        buttonGLB.width = '50px'
        buttonGLB.height = '50px'
        buttonGLB.color = 'white'
        buttonGLB.background = ''
        buttonGLB.onPointerDownObservable.add(function () {
          BABYLON.GLTF2Export.GLBAsync(scene, 'YourMesh').then((glb) => {
            glb.downloadFiles()
            alert('YourMesh.glb is in your downloads 👍')
          })
        })

        buttonGLB.addControl(buttonBackGroundGLB)
        UiPanel.addControl(buttonGLB)

        let buttonSTL = BABYLON.GUI.Button.CreateSimpleButton('but111', 'STL')
        buttonSTL.paddingTop = '10px'
        buttonSTL.width = '50px'
        buttonSTL.height = '50px'
        buttonSTL.color = 'white'
        buttonSTL.background = ''
        buttonSTL.onPointerDownObservable.add(function () {
          const data_stl = BABYLON.STLExport.CreateSTL([model])
          const a = document.createElement('a')

          a.href = window.URL.createObjectURL(
            new Blob([data_stl], { type: 'text/plain' })
          )
          a.download = 'YourMesh.stl'
          document.body.appendChild(a)

          a.click()
          document.body.removeChild(a)

          alert('YourMesh.stl is in your downloads 👍')
        })

        buttonSTL.addControl(buttonBackGroundSTL)
        UiPanel.addControl(buttonSTL)

        let buttonOBJ = BABYLON.GUI.Button.CreateSimpleButton('but111', 'OBJ')
        buttonOBJ.paddingTop = '10px'
        buttonOBJ.width = '50px'
        buttonOBJ.height = '50px'
        buttonOBJ.color = 'white'
        buttonOBJ.background = ''
        buttonOBJ.onPointerDownObservable.add(function () {
          const data_obj = BABYLON.OBJExport.OBJ([model])
          const a = document.createElement('a')

          a.href = window.URL.createObjectURL(
            new Blob([data_obj], { type: 'text/plain' })
          )
          a.download = 'YourMesh.obj'
          document.body.appendChild(a)

          a.click()
          document.body.removeChild(a)

          alert('YourMesh.obj is in your downloads 👍')
        })

        buttonOBJ.addControl(buttonBackGroundOBJ)
        UiPanel.addControl(buttonOBJ)
      } else if (gui == 0) {
        console.log('No file uploaded')
      }
    }

    showButtons()

    // TODO: implement mesh customisation
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

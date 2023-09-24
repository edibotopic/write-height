let meshify = () => {
  const canvas = document.getElementById('renderCanvas')
  const engine = new BABYLON.Engine(canvas, true)

  let createScene = () => {
    let scene = new BABYLON.Scene(engine)
    scene.clearColor = BABYLON.Color3.Black()

    cameraCreate(canvas, scene)

    lightsCreate(scene)

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

    const defaultMaterial = new BABYLON.StandardMaterial(
      'defaultMaterial',
      scene
    )

    const COLOR = new BABYLON.Color3(0.8, 0.8, 0.8)
    defaultMaterial.diffuseColor = COLOR
    model.material = defaultMaterial
    model.material.wireframe = false

    let advancedTexture =
      BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
    let UiPanel = new BABYLON.GUI.StackPanel()
    UiPanel.width = '110px'
    UiPanel.fontSize = '16px'
    UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    UiPanel.top = '30%'
    advancedTexture.addControl(UiPanel)

    let picker = new BABYLON.GUI.ColorPicker()
    picker.value = defaultMaterial.diffuseColor
    picker.height = '28%'
    picker.width = '28%'
    picker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    picker.left = '2%'
    picker.top = '35%'
    picker.hoverCursor = 'crosshair'
    picker.onValueChangedObservable.add(function (value) {
      defaultMaterial.diffuseColor.copyFrom(value)
    })
    advancedTexture.addControl(picker)

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

    let buttonSTL = BABYLON.GUI.Button.CreateSimpleButton('but222', 'STL')
    buttonSTL.paddingTop = '10px'
    buttonSTL.width = '50px'
    buttonSTL.height = '50px'
    buttonSTL.color = 'white'
    buttonSTL.background = ''
    buttonSTL.onPointerDownObservable.add(function () {
      const data_stl = BABYLON.STLExport.CreateSTL([model], false)
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

    let buttonOBJ = BABYLON.GUI.Button.CreateSimpleButton('but333', 'OBJ')
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

    buttonGLB.hoverCursor = 'pointer'
    buttonOBJ.hoverCursor = 'pointer'
    buttonSTL.hoverCursor = 'pointer'

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

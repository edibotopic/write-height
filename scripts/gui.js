'use strict'

let guiCreate = (defaultMaterial, model) => {
  while (scene.getTextureByName('UI')) {
    let UI = scene.getTextureByName('UI')
    UI.dispose(false, true)
    UI = null
  }

  let advancedTexture =
    BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')

  let RenderPanel = new BABYLON.GUI.StackPanel()
  RenderPanel.width = '120px'
  RenderPanel.fontSize = '14px'
  RenderPanel.horizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  RenderPanel.top = '30%'
  advancedTexture.addControl(RenderPanel)

  let ExportPanel = new BABYLON.GUI.StackPanel()
  ExportPanel.width = '120px'
  ExportPanel.fontSize = '14px'
  ExportPanel.horizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  ExportPanel.top = '-35%'
  advancedTexture.addControl(ExportPanel)

  let picker = new BABYLON.GUI.ColorPicker()
  picker.value = defaultMaterial.diffuseColor
  picker.height = '28%'
  picker.width = '28%'
  picker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
  picker.left = '2%'
  picker.top = '30%'
  picker.hoverCursor = 'crosshair'
  picker.onValueChangedObservable.add((value) => {
    defaultMaterial.diffuseColor.copyFrom(value)
  })
  advancedTexture.addControl(picker)

  let buttonBackGroundSTL = new BABYLON.GUI.Rectangle('')
  buttonBackGroundSTL.color = ''
  buttonBackGroundSTL.thickness = 0
  buttonBackGroundSTL.background = 'black'
  buttonBackGroundSTL.alpha = 0.5
  buttonBackGroundSTL.zIndex = -1

  let buttonSTL = BABYLON.GUI.Button.CreateSimpleButton('but222', '⤓ STL')
  buttonSTL.paddingTop = '10px'
  buttonSTL.width = '95px'
  buttonSTL.height = '40px'
  buttonSTL.left = '-7px'
  buttonSTL.color = 'violet'
  buttonSTL.highlightColor = 'violet'
  buttonSTL.isHighlighted = false
  buttonSTL.thickness = 2
  buttonSTL.fontSize = 14
  buttonSTL.fontWeight = 'bold'
  buttonSTL.background = ''

  buttonSTL.pointerEnterAnimation = () => {
    buttonSTL.color = 'white'
    buttonSTL.background = 'violet'
  }

  buttonSTL.pointerOutAnimation = () => {
    buttonSTL.color = 'violet'
    buttonSTL.background = 'black'
  }

  buttonSTL.onPointerDownObservable.add(() => {
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

  let buttonBackGroundGLB = new BABYLON.GUI.Rectangle('')
  buttonBackGroundGLB.color = ''
  buttonBackGroundGLB.thickness = 0
  buttonBackGroundGLB.background = 'black'
  buttonBackGroundGLB.alpha = 0.5
  buttonBackGroundGLB.zIndex = -1

  let buttonGLB = BABYLON.GUI.Button.CreateSimpleButton('but511', '⤓ GLB')
  buttonGLB.paddingTop = '5px'
  buttonGLB.paddingBottom = '5px'
  buttonGLB.width = '95px'
  buttonGLB.height = '40px'
  buttonGLB.left = '-7px'
  buttonGLB.color = 'violet'
  buttonGLB.highlightColor = 'violet'
  buttonGLB.isHighlighted = false
  buttonGLB.thickness = 2
  buttonGLB.fontSize = 14
  buttonGLB.fontWeight = 'bold'
  buttonGLB.background = ''

  buttonGLB.pointerEnterAnimation = () => {
    buttonGLB.color = 'white'
    buttonGLB.background = 'violet'
  }

  buttonGLB.pointerOutAnimation = () => {
    buttonGLB.color = 'violet'
    buttonGLB.background = 'black'
  }

  buttonGLB.onPointerDownObservable.add(function () {
    let ground = scene.getMeshByName('grid')
    let meshesToExclude = [ground]
    let options = {
      shouldExportNode: (node) => {
        return meshesToExclude.indexOf(node) === -1
      },
    }
    BABYLON.GLTF2Export.GLBAsync(scene, 'YourMesh', options).then((glb) => {
      glb.downloadFiles()
      alert('YourMesh.glb is in your downloads 👍')
    })
  })

  let buttonBackGroundOBJ = new BABYLON.GUI.Rectangle('')
  buttonBackGroundOBJ.color = ''
  buttonBackGroundOBJ.thickness = 0
  buttonBackGroundOBJ.background = 'black'
  buttonBackGroundOBJ.alpha = 0.5
  buttonBackGroundOBJ.zIndex = -1

  let buttonOBJ = BABYLON.GUI.Button.CreateSimpleButton('but333', '⤓ OBJ')
  buttonOBJ.paddingBottom = '10px'
  buttonOBJ.width = '95px'
  buttonOBJ.height = '40px'
  buttonOBJ.left = '-7px'
  buttonOBJ.color = 'violet'
  buttonOBJ.highlightColor = 'violet'
  buttonOBJ.isHighlighted = false
  buttonOBJ.fontSize = 14
  buttonOBJ.fontWeight = 'bold'
  buttonOBJ.thickness = 2
  buttonOBJ.background = ''

  buttonOBJ.pointerEnterAnimation = () => {
    buttonOBJ.color = 'white'
    buttonOBJ.background = 'violet'
  }

  buttonOBJ.pointerOutAnimation = () => {
    buttonOBJ.color = 'violet'
    buttonOBJ.background = 'black'
  }

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

  let headerTurn = new BABYLON.GUI.TextBlock('chk223', 'checkbox')
  headerTurn.paddingTop = '-50px'
  headerTurn.text = 'Turntable'
  headerTurn.width = '90px'
  headerTurn.left = '-10px'
  headerTurn.color = 'violet'
  headerTurn.fontWeight = 'bold'
  headerTurn.fontSize = '14'
  headerTurn.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT

  let checkTurn = new BABYLON.GUI.Checkbox()
  checkTurn.width = '20px'
  checkTurn.height = '30px'
  checkTurn.left = '30px'
  checkTurn.paddingTop = 10
  checkTurn.isChecked = false
  checkTurn.color = 'violet'
  checkTurn.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT

  buttonOBJ.pointerOutAnimation = () => {
    buttonOBJ.color = 'violet'
    buttonOBJ.background = 'black'
  }

  checkTurn.onIsCheckedChangedObservable.add((value) => {
    if (value == true) {
      rotate = true
    } else {
      rotate = false
    }
  })

  let headerWire = new BABYLON.GUI.TextBlock('chk224', 'checkbox')
  headerWire.paddingTop = '0'
  headerWire.text = 'Wireframe'
  headerWire.width = '70px'
  headerWire.left = '-20px'
  headerWire.color = 'violet'
  headerWire.fontWeight = 'bold'
  headerWire.fontSize = '14'
  headerWire.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT

  let checkWire = new BABYLON.GUI.Checkbox()
  checkWire.width = '20px'
  checkWire.height = '25px'
  checkWire.left = '30px'
  checkWire.paddingTop = '2.5px'
  checkWire.paddingBottom = '2.5px'
  checkWire.isChecked = false
  checkWire.color = 'violet'
  checkWire.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  checkWire.onIsCheckedChangedObservable.add((value) => {
    if (value == true) {
      model.material.wireframe = true
    } else {
      model.material.wireframe = false
    }
  })

  let headerGrid = new BABYLON.GUI.TextBlock('chk224', 'checkbox')
  headerGrid.paddingTop = '54px'
  headerGrid.text = 'Hide Grid'
  headerGrid.width = '70px'
  headerGrid.left = '-20px'
  headerGrid.color = 'violet'
  headerGrid.fontWeight = 'bold'
  headerGrid.fontSize = '14'
  headerGrid.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT

  let checkGrid = new BABYLON.GUI.Checkbox()
  checkGrid.width = '20px'
  checkGrid.height = '30px'
  checkGrid.left = '30px'
  checkGrid.paddingBottom = 10
  checkGrid.isChecked = false
  checkGrid.color = 'violet'
  checkGrid.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  checkGrid.onIsCheckedChangedObservable.add((value) => {
    const ground = scene.getMeshByName('grid')
    if (value == true) {
      console.log(value)
      ground.setEnabled(false)
    } else {
      console.log(value)
      ground.setEnabled(true)
    }
  })

  let exportBackGround = new BABYLON.GUI.Rectangle('')
  exportBackGround.thickness = 0
  exportBackGround.background = 'black'
  exportBackGround.alpha = 0.5
  exportBackGround.paddingRight = 14
  exportBackGround.cornerRadius = 10
  exportBackGround.zIndex = -2

  let renderBackGround = new BABYLON.GUI.Rectangle('')
  renderBackGround.thickness = 0
  renderBackGround.background = 'black'
  renderBackGround.alpha = 0.5
  renderBackGround.paddingRight = 14
  renderBackGround.cornerRadius = 10
  renderBackGround.zIndex = -2

  RenderPanel.addControl(renderBackGround)
  RenderPanel.addControl(headerTurn)
  RenderPanel.addControl(headerWire)
  RenderPanel.addControl(headerGrid)
  checkTurn.hoverCursor = 'pointer'
  checkWire.hoverCursor = 'pointer'
  checkGrid.hoverCursor = 'pointer'
  RenderPanel.addControl(checkTurn)
  RenderPanel.addControl(checkWire)
  RenderPanel.addControl(checkGrid)
  RenderPanel.spacing = 5

  ExportPanel.addControl(exportBackGround)
  buttonSTL.addControl(buttonBackGroundSTL)
  ExportPanel.addControl(buttonSTL)
  buttonSTL.hoverCursor = 'pointer'
  buttonGLB.addControl(buttonBackGroundGLB)
  ExportPanel.addControl(buttonGLB)
  buttonGLB.hoverCursor = 'pointer'
  buttonOBJ.addControl(buttonBackGroundOBJ)
  ExportPanel.addControl(buttonOBJ)
  buttonOBJ.hoverCursor = 'pointer'
  ExportPanel.spacing = 5

  return (
    RenderPanel,
    ExportPanel,
    picker,
    buttonSTL,
    buttonGLB,
    buttonOBJ,
    headerTurn,
    headerWire,
    headerGrid,
    checkTurn,
    checkWire,
    checkGrid
  )
}

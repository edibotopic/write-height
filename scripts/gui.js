'use strict'

let guiCreate = (defaultMaterial, model) => {
  while (scene.getTextureByName('UI')) {
    let UI = scene.getTextureByName('UI')
    UI.dispose(false, true)
    UI = null
  }

  let advancedTexture =
    BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
  let UiPanel = new BABYLON.GUI.StackPanel()
  UiPanel.width = '120px'
  UiPanel.fontSize = '14px'
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
  buttonSTL.color = 'white'
  buttonSTL.background = ''
  buttonSTL.onPointerDownObservable.add(() => {
    /* NOTE: for y-up software model needs to be rotated*/
    /* z-up is currently the default */
    /* model.rotation.x = Math.PI/2; */
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
    /* model.rotation.x = -Math.PI/2; */
  })

  let headerTurn = new BABYLON.GUI.TextBlock('chk223', 'checkbox')
  headerTurn.paddingTop = '-2px'
  headerTurn.text = 'Turntable'
  headerTurn.width = '90px'
  headerTurn.left = '-10px'
  headerTurn.color = 'white'
  headerTurn.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT

  let checkTurn = new BABYLON.GUI.Checkbox()
  checkTurn.width = '20px'
  checkTurn.height = '20px'
  checkTurn.left = '30px'
  checkTurn.isChecked = false
  checkTurn.color = 'white'
  checkTurn.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  checkTurn.onIsCheckedChangedObservable.add((value) => {
    if (value == true) {
      rotate = true
    } else {
      rotate = false
    }
  })

  let headerWire = new BABYLON.GUI.TextBlock('chk224', 'checkbox')
  headerWire.paddingTop = '46'
  headerWire.text = 'Wireframe'
  headerWire.width = '70px'
  headerWire.left = '-20px'
  headerWire.color = 'white'
  headerWire.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT

  let checkWire = new BABYLON.GUI.Checkbox()
  checkWire.width = '20px'
  checkWire.height = '20px'
  checkWire.left = '30px'
  checkWire.isChecked = false
  checkWire.color = 'white'
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
  headerGrid.paddingTop = '94px'
  headerGrid.text = 'Hide Grid'
  headerGrid.width = '70px'
  headerGrid.left = '-20px'
  headerGrid.color = 'white'
  headerGrid.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT

  let checkGrid = new BABYLON.GUI.Checkbox()
  checkGrid.width = '20px'
  checkGrid.height = '20px'
  checkGrid.left = '30px'
  checkGrid.isChecked = false
  checkGrid.color = 'white'
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

  UiPanel.addControl(headerTurn)
  UiPanel.addControl(headerWire)
  UiPanel.addControl(headerGrid)
  buttonSTL.addControl(buttonBackGroundSTL)
  UiPanel.addControl(buttonSTL)
  buttonSTL.hoverCursor = 'pointer'
  checkTurn.hoverCursor = 'pointer'
  checkWire.hoverCursor = 'pointer'
  checkGrid.hoverCursor = 'pointer'
  UiPanel.addControl(checkTurn)
  UiPanel.addControl(checkWire)
  UiPanel.addControl(checkGrid)
  UiPanel.spacing = 5

  return (
    UiPanel,
    picker,
    buttonSTL,
    headerTurn,
    headerWire,
    headerGrid,
    checkTurn,
    checkWire,
    checkGrid
  )
}

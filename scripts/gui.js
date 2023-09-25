'use strict'

let guiCreate = (defaultMaterial, model) => {
  let advancedTexture =
    BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
  let UiPanel = new BABYLON.GUI.StackPanel()
  UiPanel.width = '110px'
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

  let buttonSTL = BABYLON.GUI.Button.CreateSimpleButton('but222', 'STL (beta)')
  buttonSTL.paddingTop = '10px'
  buttonSTL.width = '80px'
  buttonSTL.height = '40px'
  buttonSTL.color = 'white'
  buttonSTL.background = ''
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

  let header = new BABYLON.GUI.TextBlock('chk222', 'checkbox')
  header.paddingTop = '60px'
  header.text = 'Turntable'
  header.width = '80px'
  header.color = 'white'
  header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT

  let checkbox = new BABYLON.GUI.Checkbox()
  checkbox.width = '20px'
  checkbox.height = '20px'
  checkbox.left = '30px'
  checkbox.isChecked = false
  checkbox.color = 'white'
  checkbox.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  checkbox.onIsCheckedChangedObservable.add(function (value) {
    if (value == true) {
      rotate = true
    } else {
      rotate = false
    }
  })

  UiPanel.addControl(header)
  buttonSTL.addControl(buttonBackGroundSTL)
  UiPanel.addControl(buttonSTL)
  buttonSTL.hoverCursor = 'pointer'
  checkbox.hoverCursor = 'pointer'
  UiPanel.addControl(checkbox)
  UiPanel.spacing = 20

  return UiPanel, picker, buttonSTL, header, checkbox
}

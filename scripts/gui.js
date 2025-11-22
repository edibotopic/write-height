import { Color3 } from '@babylonjs/core'
import * as GUI from '@babylonjs/gui'
import { STLExport, OBJExport, GLTF2Export } from '@babylonjs/serializers'

export let guiCreate = (defaultMaterial, model, image, scene, state) => {
  while (scene.getTextureByName('UI')) {
    let UI = scene.getTextureByName('UI')
    UI.dispose(false, true)
    UI = null
  }

  let advancedTexture =
    GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')

  let LODPanel = new GUI.StackPanel('LODPanel')
  LODPanel.width = '120px'
  LODPanel.fontSize = '14px'
  LODPanel.horizontalAlignment =
    GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  LODPanel.top = '10%'
  advancedTexture.addControl(LODPanel)

  // Store globally so we can hide/show it
  state.currentLODPanel = LODPanel

  let RenderPanel = new GUI.StackPanel()
  RenderPanel.width = '120px'
  RenderPanel.fontSize = '14px'
  RenderPanel.horizontalAlignment =
    GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  RenderPanel.top = '30%'
  advancedTexture.addControl(RenderPanel)

  let ExportPanel = new GUI.StackPanel()
  ExportPanel.width = '120px'
  ExportPanel.fontSize = '14px'
  ExportPanel.horizontalAlignment =
    GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  ExportPanel.top = '-28%'
  advancedTexture.addControl(ExportPanel)

  let picker = new GUI.ColorPicker()
  picker.value = state.currentColor
  picker.height = '28%'
  picker.width = '28%'
  picker.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
  picker.left = 15
  picker.top = '30%'
  picker.hoverCursor = 'crosshair'
  picker.background = "transparent";  // or a solid color
  picker.onValueChangedObservable.add((value) => {
    defaultMaterial.diffuseColor.copyFrom(value)
    state.currentColor.copyFrom(value)
  })
  advancedTexture.addControl(picker)

  let buttonBackGroundSTL = new GUI.Rectangle('')
  buttonBackGroundSTL.color = ''
  buttonBackGroundSTL.thickness = 0
  buttonBackGroundSTL.background = 'black'
  buttonBackGroundSTL.alpha = 0.5
  buttonBackGroundSTL.zIndex = -1

  let buttonSTL = GUI.Button.CreateSimpleButton('but222', '⤓ STL')
  buttonSTL.paddingTop = '10px'
  buttonSTL.width = '95px'
  buttonSTL.height = '30px'
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
    const data_stl = STLExport.CreateSTL([model], false)
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

  let buttonBackGroundGLB = new GUI.Rectangle('')
  buttonBackGroundGLB.color = ''
  buttonBackGroundGLB.thickness = 0
  buttonBackGroundGLB.background = 'black'
  buttonBackGroundGLB.alpha = 0.5
  buttonBackGroundGLB.zIndex = -1

  let buttonGLB = GUI.Button.CreateSimpleButton('but511', '⤓ GLB')
  buttonGLB.paddingTop = '5px'
  buttonGLB.paddingBottom = '5px'
  buttonGLB.width = '95px'
  buttonGLB.height = '30px'
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
    GLTF2Export.GLBAsync(scene, 'YourMesh', options).then((glb) => {
      glb.downloadFiles()
      alert('YourMesh.glb is in your downloads 👍')
    })
  })

  let buttonBackGroundOBJ = new GUI.Rectangle('')
  buttonBackGroundOBJ.color = ''
  buttonBackGroundOBJ.thickness = 0
  buttonBackGroundOBJ.background = 'black'
  buttonBackGroundOBJ.alpha = 0.5
  buttonBackGroundOBJ.zIndex = -1

  let buttonOBJ = GUI.Button.CreateSimpleButton('but333', '⤓ OBJ')
  buttonOBJ.paddingBottom = '10px'
  buttonOBJ.width = '95px'
  buttonOBJ.height = '30px'
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
    const data_obj = OBJExport.OBJ([model])
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

  let headerLOD = new GUI.TextBlock('lodHeader', 'LOD Header')
  headerLOD.paddingTop = '10px'
  headerLOD.height = '25px'
  headerLOD.text = 'Detail'
  headerLOD.width = '90px'
  headerLOD.left = '-10px'
  headerLOD.color = 'violet'
  headerLOD.fontWeight = 'bold'
  headerLOD.fontSize = '14'
  headerLOD.textHorizontalAlignment =
    GUI.Control.HORIZONTAL_ALIGNMENT_LEFT

  let lodLow = GUI.Button.CreateSimpleButton('lodLow', 'Low')
  lodLow.width = '95px'
  lodLow.height = '30px'
  lodLow.left = '-7px'
  lodLow.color = state.subdivisions === 100 ? 'white' : 'violet'
  lodLow.background = state.subdivisions === 100 ? 'violet' : ''
  lodLow.thickness = 2
  lodLow.fontSize = 14
  lodLow.fontWeight = 'bold'
  lodLow.paddingTop = '5px'
  lodLow.hoverCursor = 'pointer'
  lodLow.onPointerDownObservable.add(() => {
    state.subdivisions = 100
    lodLow.color = 'white'
    lodLow.background = 'violet'
    lodMed.color = 'violet'
    lodMed.background = ''
    lodHigh.color = 'violet'
    lodHigh.background = ''
    state.regenerateMesh()
  })

  let lodMed = GUI.Button.CreateSimpleButton('lodMed', 'Med')
  lodMed.width = '95px'
  lodMed.height = '30px'
  lodMed.left = '-7px'
  lodMed.color = state.subdivisions === 200 ? 'white' : 'violet'
  lodMed.background = state.subdivisions === 200 ? 'violet' : ''
  lodMed.thickness = 2
  lodMed.fontSize = 14
  lodMed.fontWeight = 'bold'
  lodMed.paddingTop = '2px'
  lodMed.paddingBottom = '2px'
  lodMed.hoverCursor = 'pointer'
  lodMed.onPointerDownObservable.add(() => {
    state.subdivisions = 200
    lodLow.color = 'violet'
    lodLow.background = ''
    lodMed.color = 'white'
    lodMed.background = 'violet'
    lodHigh.color = 'violet'
    lodHigh.background = ''
    state.regenerateMesh()
  })

  let lodHigh = GUI.Button.CreateSimpleButton('lodHigh', 'High')
  lodHigh.width = '95px'
  lodHigh.height = '30px'
  lodHigh.left = '-7px'
  lodHigh.color = state.subdivisions === 400 ? 'white' : 'violet'
  lodHigh.background = state.subdivisions === 400 ? 'violet' : ''
  lodHigh.thickness = 2
  lodHigh.fontSize = 14
  lodHigh.fontWeight = 'bold'
  lodHigh.paddingBottom = '5px'
  lodHigh.hoverCursor = 'pointer'
  lodHigh.onPointerDownObservable.add(() => {
    state.subdivisions = 400
    lodLow.color = 'violet'
    lodLow.background = ''
    lodMed.color = 'violet'
    lodMed.background = ''
    lodHigh.color = 'white'
    lodHigh.background = 'violet'
    state.regenerateMesh()
  })

  let lodBackGround = new GUI.Rectangle('')
  lodBackGround.thickness = 0
  lodBackGround.background = 'black'
  lodBackGround.alpha = 0.5
  lodBackGround.paddingRight = 14
  lodBackGround.cornerRadius = 10
  lodBackGround.zIndex = -2

  let headerTurn = new GUI.TextBlock('chk223', 'checkbox')
  headerTurn.paddingTop = '-50px'
  headerTurn.text = 'Turntable'
  headerTurn.width = '90px'
  headerTurn.left = '-10px'
  headerTurn.color = 'violet'
  headerTurn.fontWeight = 'bold'
  headerTurn.fontSize = '14'
  headerTurn.textHorizontalAlignment =
    GUI.Control.HORIZONTAL_ALIGNMENT_LEFT

  let checkTurn = new GUI.Checkbox()
  checkTurn.width = '20px'
  checkTurn.height = '30px'
  checkTurn.left = '30px'
  checkTurn.paddingTop = 10
  checkTurn.isChecked = false
  checkTurn.color = 'violet'
  checkTurn.textHorizontalAlignment =
    GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT

  buttonOBJ.pointerOutAnimation = () => {
    buttonOBJ.color = 'violet'
    buttonOBJ.background = 'black'
  }

  checkTurn.isChecked = state.turntableState
  checkTurn.onIsCheckedChangedObservable.add((value) => {
    if (value == true) {
      state.rotate = true
      state.turntableState = true
    } else {
      state.rotate = false
      state.turntableState = false
    }
  })

  let headerWire = new GUI.TextBlock('chk224', 'checkbox')
  headerWire.paddingTop = '0'
  headerWire.text = 'Wireframe'
  headerWire.width = '70px'
  headerWire.left = '-20px'
  headerWire.color = 'violet'
  headerWire.fontWeight = 'bold'
  headerWire.fontSize = '14'
  headerWire.textHorizontalAlignment =
    GUI.Control.HORIZONTAL_ALIGNMENT_LEFT

  let checkWire = new GUI.Checkbox()
  checkWire.width = '20px'
  checkWire.height = '25px'
  checkWire.left = '30px'
  checkWire.paddingTop = '2.5px'
  checkWire.paddingBottom = '2.5px'
  checkWire.isChecked = state.wireframeState
  checkWire.color = 'violet'
  checkWire.textHorizontalAlignment =
    GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  checkWire.onIsCheckedChangedObservable.add((value) => {
    if (value == true) {
      state.wireframeState = true
      if (state.currentModel && state.currentModel.material) {
        state.currentModel.material.wireframe = true
      }
    } else {
      state.wireframeState = false
      if (state.currentModel && state.currentModel.material) {
        state.currentModel.material.wireframe = false
      }
    }
  })

  let headerGrid = new GUI.TextBlock('chk224', 'checkbox')
  headerGrid.paddingTop = '54px'
  headerGrid.text = 'Show Grid'
  headerGrid.width = '70px'
  headerGrid.left = '-20px'
  headerGrid.color = 'violet'
  headerGrid.fontWeight = 'bold'
  headerGrid.fontSize = '14'
  headerGrid.textHorizontalAlignment =
    GUI.Control.HORIZONTAL_ALIGNMENT_LEFT

  let checkGrid = new GUI.Checkbox()
  checkGrid.width = '20px'
  checkGrid.height = '30px'
  checkGrid.left = '30px'
  checkGrid.paddingBottom = 10
  checkGrid.isChecked = state.gridState
  checkGrid.color = 'violet'
  checkGrid.textHorizontalAlignment =
    GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  checkGrid.onIsCheckedChangedObservable.add((value) => {
    const ground = scene.getMeshByName('grid')
    if (value == true) {
      ground.setEnabled(true)
      state.gridState = true
    } else {
      ground.setEnabled(false)
      state.gridState = false
    }
  })


  let exportBackGround = new GUI.Rectangle('')
  exportBackGround.thickness = 0
  exportBackGround.background = 'black'
  exportBackGround.alpha = 0.5
  exportBackGround.paddingRight = 14
  exportBackGround.cornerRadius = 10
  exportBackGround.zIndex = -2

  let renderBackGround = new GUI.Rectangle('')
  renderBackGround.thickness = 0
  renderBackGround.background = 'black'
  renderBackGround.alpha = 0.5
  renderBackGround.paddingRight = 14
  renderBackGround.cornerRadius = 10
  renderBackGround.zIndex = -2

  LODPanel.addControl(lodBackGround)
  LODPanel.addControl(headerLOD)
  LODPanel.addControl(lodLow)
  LODPanel.addControl(lodMed)
  LODPanel.addControl(lodHigh)
  LODPanel.spacing = 2

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
  ExportPanel.spacing = 2

  const img = image.src
  const source = new GUI.Image('image', img)
  source.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
  source.width = '80px'
  source.height = '80px'
  source.top = '-28%'
  source.left = 15
  source.alpha = 0.5
  advancedTexture.addControl(source)

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
    checkGrid,
    source
  )
}

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

let applyHeightGradient = (model) => {
  const positions = model.getVerticesData(BABYLON.VertexBuffer.PositionKind)
  const colors = []

  // Find min and max heights
  let minY = Infinity
  let maxY = -Infinity

  for (let i = 1; i < positions.length; i += 3) {
    const y = positions[i]
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }

  const range = maxY - minY

  // Apply color based on height with natural terrain colors
  for (let i = 1; i < positions.length; i += 3) {
    const y = positions[i]
    const normalized = (y - minY) / range

    // Natural terrain gradient: water (low) -> sand -> green -> brown -> snow (peaks)
    let r, g, b

    if (normalized < 0.15) {
      // Deep water blue to shallow water
      const t = normalized / 0.15
      r = 0.1 + t * 0.1   // 0.1 to 0.2
      g = 0.2 + t * 0.35  // 0.2 to 0.55
      b = 0.5 + t * 0.3   // 0.5 to 0.8
    } else if (normalized < 0.3) {
      // Shallow water to sandy beach
      const t = (normalized - 0.15) / 0.15
      r = 0.2 + t * 0.6   // 0.2 to 0.8
      g = 0.55 + t * 0.2  // 0.55 to 0.75
      b = 0.8 - t * 0.4   // 0.8 to 0.4
    } else if (normalized < 0.6) {
      // Sand to grass/forest green
      const t = (normalized - 0.3) / 0.3
      r = 0.8 - t * 0.5   // 0.8 to 0.3
      g = 0.75 - t * 0.1  // 0.75 to 0.65
      b = 0.4 - t * 0.15  // 0.4 to 0.25
    } else if (normalized < 0.8) {
      // Green to brown/rock
      const t = (normalized - 0.6) / 0.2
      r = 0.3 + t * 0.35  // 0.3 to 0.65
      g = 0.65 - t * 0.2  // 0.65 to 0.45
      b = 0.25 + t * 0.05 // 0.25 to 0.30
    } else {
      // Brown to white/snow peaks
      const t = (normalized - 0.8) / 0.2
      r = 0.65 + t * 0.25 // 0.65 to 0.90
      g = 0.45 + t * 0.45 // 0.45 to 0.90
      b = 0.30 + t * 0.60 // 0.30 to 0.90
    }

    colors.push(r, g, b, 1)
  }

  model.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors)
  model.material.useVertexColors = true
}

let removeHeightGradient = (model) => {
  if (model && model.material) {
    model.material.useVertexColors = false
  }
}

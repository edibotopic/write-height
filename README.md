# Write Height

This is a web tool for easily creating 3D meshes from greyscale images.
It was designed to be a free and portable way to view and create 3D models without
the need to download software or use complex tools.

Much of the underlying 3D functionality is provided by the excellent
[Babylon.js](https://www.babylonjs.com) engine, which provides functions for
heightmapping, rendering and file creation.

## How it Works

### Model Generation and Viewing

You can generate a random model or upload a greyscale image from your phone, tablet or computer.
Images can be dragged and dropped onto the canvas, if you prefer.
After an image is added, it will automatically be converted into a 3D model. 

The way the model is rendered can be controlled, with toggles for
`turntable`, `wireframe` and `show grid`, as well as colouring.

Models can be rotated by dragging over the model with the left mouse button or by swiping
on a touchscreen. 
Zooming is controlled using a scroll-wheel or by pinching on a touchscreen. 
Panning can be achieved by dragging with the right mouse button. 
Arrow keys can also be used to control the camera as long as the model is focused (i.e., it has been clicked).

### Exporting Models

Currently the models can be exported to `.stl`, `.obj` and `.glb` formats.
When tested with Blender, all models were imported in the correct
orientation.
In other software models may need to be rotated into place.

## To-do

- [X] Fix bug where multiple downloads trigger
- [X] Allow level of detail in model to be adjusted 
- [ ] Test option to adjust orientation (y-up/z-up) for export
- [X] Reintroduce `.glb` and `.obj` exports
- [ ] Improve feedback and file-naming on export
- [X] Persist toggled options between model loadings
- [ ] More and better examples

## Changelog

### v0.2

- Invert model option
- Drag and drop images to canvas
- Level of detail control
- Model edits through filters (smooth, contrast, brightness)
- Vertex colouring option
- Reload current model button

### v0.1.3

- All major export formats added
- Better GUI styling
- Code cleanup

### v0.1.2

- Multiple download bug fixed
- Added wireframe toggle
- Added grid toggle
- Dispose GUI on repaint
- Minor rendering changes

### v0.1.1

- Added turntable toggle
- Refactored scripts into separate files
- Removed primitive drawing features
- Minor style changes

### v0.1.0

- Conversion of images to 3D with adjustable colour
- Download of meshes to different file formats
- Implementation of simple drawing tools for image creation

## Similar Tools

Ephtracy's [aerialod](https://ephtracy.github.io/index.html?page=aerialod) is an amazing piece of software for rendering high quality 3D models from images and offers a high degree of customisation. 
The software is Windows-only and does not support mobile devices.

## Note

I obtained some of the example heightmaps from the internet and assume they are
free to use. If you recognise an image of yours that you would like me to credit
or remove please let me know.

I plan on replacing some or all of them with original images.

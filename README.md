# Write Height

This is a web app for easily creating 3D meshes from grayscale images.

It was designed to be a simple, free and portable way to view and create 3D models without
needing to download software or use complex tools.

## How it Works

You can display a random model or select a grayscale image from your phone, tablet or computer.
Images are automatically converted into 3D models. You can rotate
around the 3D model by dragging over the model with the left mouse button or by swiping
across your touchscreen. Zooming is controlled using a scroll-wheel or by 
pinching on a touchscreen. Panning can be achieved by holding <kbd>ctrl</kbd>
and the left mouse button or simply the right mouse button. Arrow keys can also be used to control the camera as long as the model is focused (i.e., it has been clicked).

Currently the models can be downloaded in `.stl` format only.

Much of the underlying 3D functionality is provided by the excellent
[Babylon.js](https://www.babylonjs.com) engine, which provides functions for heightmapping, rendering and file creation.

## Limitations

The rendered objects may not be optimal for specific uses without further editing. For example,
you may want to inspect the topology of the model to ensure there is a low
polygon count (games) or no non-manifold geometry (printing). Your 3D printing
software should alert you to any issues with the model relating to ground support.

## To-do

- [X] Fix bug where multiple downloads trigger
- [ ] Allow level of detail in model to be adjusted 
- [ ] Exported models should ideally lay flat

## Changelog

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

Ephtracy's [aerialod](https://ephtracy.github.io/index.html?page=aerialod) is an amazing piece of software for rendering high quality 3D models from images and offers a high degree of customisation. The software is Windows-only and does not support mobile devices.

## Note

I obtained some of the example heightmaps from the
internet and assume they are free to
use. If you recognise an image of
yours that you would like me to
credit or remove please let me
know.

I plan on replacing some or all of them with original images.

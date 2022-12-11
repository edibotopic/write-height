# Write Height

> **Note:**
> Not currently optimised for mobile screens

This is a web app for easily creating 3D meshes from grayscale images.

It was designed to be a simple, free and portable way to create 3D models without
requiring software downloads or (much) technical know-how.

The latest version implements two simple tools to generate images that can be uploaded to the app, one by manually drawing an image and the other by algorithmically generating an image.

## How it Works

Click the <kbd>Upload an image</kbd> button to select a file on your phone, tablet or computer.
The image will then be shown on screen as a 3D render. You can rotate
around the 3D model by dragging over the model with the left mouse button or by swiping
across your touchscreen. Zooming is controlled using a scroll-wheel or by 
pinching on a touchscreen. Panning can be achieved by holding <kbd>ctrl</kbd>
and the left mouse button or simply the right mouse button. Arrow keys can also be used to control the camera as long as the model is focused (i.e., it has been clicked).

Once a file is uploaded buttons will appear that allow you to download the 3D file.
There are three options currently: `.obj`, `.glb` or `.stl`. The `.stl`
option is probably preferred if you are working on a 3D printing project
while the other filetypes are commonly used in 3D graphics and game design.

Much of the underlying 3D functionality is provided by the excellent
[Babylon.js](https://www.babylonjs.com) engine, which provides functions for heightmapping, rendering and file creation.

## Limitations

The rendered objects may not be optimal for specific uses without further editing. For example,
you may want to inspect the topology of the model to ensure there is a low
polygon count (games) or no non-manifold geometry (printing). Your 3D printing
software should alert you to any issues with the model relating to ground support.

Some of these limitations may be addressed in future versions.

## Roadmap

- [ ] Optimise responsiveness and accessibility
- [ ] Resize all canvas scenes for mobile
- [ ] Improve the documentation
- [ ] Some guidelines/best-practices for making heightmaps
- [ ] More examples (preferably made in a documented way)
- [ ] Better interactivity/discoverability with drawing tools 

### Known Issues

- Some scaling issues with the GUI on the 3D scene in all devices
- Manually drawn images possibly should have smoothing option
- Internal links spawn too many windows

## Changelog

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

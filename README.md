# Write Height

This is a tiny web-based tool for easily creating 3D meshes from greyscale images.

It was designed to be a simple, free and mobile way to create 3D models without
requiring software downloads or technical know-how.

## How it Works

Click the <kbd>browse</kbd> button to select a file on your phone, tablet or computer.
The image will then be shown on screen as a 3D render. You can rotate
around the 3D model by dragging with the left mouse button or by swiping
across your touchscreen. Zooming is controlled using a scroll-wheel or by 
pinching on a touchscreen. Panning can be achieved by holding <kbd>ctrl</kbd>
and the left mouse button or simply the right mouse button.

Once a file is uploaded buttons will appear that allow you to download the 3D file.
There are three options currently: `.obj`, `.glb` or `.stl`. The `.stl`
option is probably preferred if you are working on a 3D printing project
while the other filetypes are commonly used in 3D graphics and game design.

Much of the underlying functionality is provided by the excellent
[Babylon.js](https://www.babylonjs.com) engine, which enables the heightmapping, rendering and file creation.

> **Note** 
> Large image files will take longer to process 

## Limitations

The rendered objects may not be ready for specific uses without further editing. For example,
you may want to inspect the topology of the model to ensure there is a low
polygon count (games) or no non-manifold geometry (printing). Your 3D printing
software should alert you to any issues with the model relating to ground support.

Some of these limitations may be addressed in future versions.

## Roadmap

- [ ] Figure out a texturing solution
- [ ] Sliders for controlling subdivisions, height and depth of model
- [ ] Comment on image filetypes in readme
- [ ] Option to invert height map (peaks become valleys and vice versa)
- [ ] Camera for user to navigate/walk the surface of the model
- [ ] Toggle wireframe to better see model topology
- [ ] Figure out textures: needed? procedural option?
- [x] Add gridlines in render window
- [ ] Change name of file to download
- [ ] Simple graphic to explain concept
- [ ] More demos - especially hand-drawn
- [ ] Gallery
- [ ] License
- [ ] Guide: methods to create heightmaps
- [ ] More interesting colors/post-processing?
- [x] More minimal aesthetic

## Demos

If you clone this repo you can try several
images in the ./demos/ directory. These can
also be viewed by simply refreshing the webpage,
which will show one of them randomly.

I obtained some of these heightmaps from the
internet and assume they are free to
use. If you recognise an image of
yours that you would like me to
credit or remove please let me
know.

> **Warning** 
> Currently it is not possible
> to download 3D models of the randomly 
> generated meshes. You need to upload
> your own image to generate a downloadable model.

## Similar Tools

Ephtracy's [aerialod](https://ephtracy.github.io/index.html?page=aerialod) is an amazing piece of software for rendering high quality 3D models from images and offers a high degree of customisation. The software is Windows-only and does not support mobile devices.
